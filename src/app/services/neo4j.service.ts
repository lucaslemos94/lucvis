import { Injectable } from '@angular/core';
import neo4j from "neo4j-driver/lib/browser/neo4j-web";
import { Researcher } from 'src/model/researcher.model';
import { University } from 'src/model/university.model';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';



@Injectable({
  providedIn: 'root'
})
export class Neo4jService {

  constructor() { }

  driver =  neo4j.driver(environment.HOST_PORT,neo4j.auth.basic(environment.USER,environment.PASSWORD));

  //get a list of all universitys
  getUniversitys(universitys:University[]):void{ 
   
    const session = this.driver.session({database: environment.DATABASE});
  

    session
      .run('MATCH (i:Institution) return i.name as name ORDER BY name ASC', {})
      
      .then(result => {

        result.records.forEach(record => {
            
           //pass every record to JS object, then push in array of universitys
            const objectRecord= record.toObject();
            
            // universitys.push({id:objectRecord.i.identity.low,name:objectRecord.i.properties.name});
            universitys.push({name:objectRecord.name});
           
        })
        
        })
        .catch(error => {
            console.log(error)
        })
        .then(() =>{     
            session.close();
    
        });

}

//get all seed researchers from given university
getSeeds(university:string,seeds:Researcher[]):void{

  const session = this.driver.session({database: environment.DATABASE});

  session
    .run('MATCH (a:Author)-[:ASSOCIATED_TO]-(:Institution{name:$university}) return a  ORDER BY a.name ASC',{university})
    
    .then(result => {

      result.records.forEach(record => {
        
        //pass every record to JS object, then push in array of seeds
        const objectRecord= record.toObject();
          
        seeds.push({id:objectRecord.a.identity.low,name:objectRecord.a.properties.name});

        // seeds.push({id:objectRecord.a.identity.low,name:objectRecord.a.properties.name});
        
      })

      })
      .catch(error => { console.log(error)})
      .then(() =>{session.close();});
    
}


  // get a list of researchers from with given name
  async getResearchers(name:string){

    const session = await this.driver.session({database: environment.DATABASE});
    
    // result with userId,name and seed properties, ordered by name
    const result =  await session.run(`MATCH(a:Author) WHERE  a.name=~'(?i)${name} .*' OR a.name=~'(?i).* ${name}'
                                      OR a.name=~'(?i).* ${name} .*' OR a.name=~'(?i)${name}' return id(a) as id, a.name as name, a.seed as seed order by a.name asc`,{})
    
    await session.close();

    return result;

  }

  async getNetwork(university:University,researchers:Researcher[],years:number[]){

    const session =  await this.driver.session({database: environment.DATABASE});

    let result = null;


    if ((years[0]==environment.year.from && years[1]==environment.year.to))

        result = await session.run(`MATCH (i:Institution{name:"${university}"})-[]-(a1:Author)-[co:COAUTHOR_WEIGHT]-(a2:Author) WHERE id(a1) IN [${researchers}] return a1,co,a2`);
    else{
        
        years = _.range(years[0],years[1]+1);
        result = await session.run( `MATCH (i:Institution{name:"${university}"})-[]-(a1:Author)-[co:COAUTHOR]-(a2:Author) WHERE id(a1) IN [${researchers}] AND co.year IN [${years}] return a1,co,a2`);
    }
    session.close();

    return result;
    
  }
    


  // get author coauthorship, lowest, medium and highest by year
  async getCoauthoring(id:number){

    const promises=[];
    const years=[];
  
    const session = await this.driver.session({database: environment.DATABASE});
  
    const result =  await session.run(`MATCH (a1:Author)-[co:COAUTHOR]-(a2:Author) WHERE id(a1)=${id} return count(co) as amount,co.year as year order by year`,{})
  
    promises.push(result);

    result.records.forEach( record =>{
      years.push(record._fields[1].low);
     
    });

    const result2 = await session.run(`MATCH (i:Institution{name:"UnB"})-[rel:ASSOCIATED_TO]-(a1:Author)-[co:COAUTHOR]->(a2:Author)
                                        WHERE co.year IN [${years}]
                                        WITH count (co) as amount, count(distinct a1) as seeds, co.year as year
                                        return amount/seeds as media order by year`,{})
  
    promises.push(result2)
  
    const result3= await session.run(`MATCH(i:Institution{name:"UnB"})-[rel:ASSOCIATED_TO]-(a1:Author)-[co:COAUTHOR]-(a2:Author)
    WHERE co.year IN [${years}]
    
    WITH co.year AS year,a1,count(co) AS amount
    WITH min(amount) AS minAmount, max(amount) AS maxAmount,year
    
    RETURN minAmount, maxAmount,year order by year`,{})
  
    promises.push(result3)

    session.close();
  
    return promises
  
  }
  
  // get publications by year from an author
  async getPublications(id:number){

    // const promises=[];
    const session =  await this.driver.session({database: environment.DATABASE});
  
    const result =  await session.run(`MATCH (a:Author)-[au:AUTHORING]-(p:Publication)

    WHERE id(a) = ${id}

    WITH p.year as year,count(p) as amount
    
    return amount,year order by year`,{});
  
    // promises.push(result);

    session.close();

    return result

  }

}