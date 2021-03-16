import { Injectable } from '@angular/core';
import Neovis from 'src/app/neovis.js-master/dist/neovis.js';
import { University } from 'src/model/university.model';
import { Researcher } from 'src/model/researcher.model';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
// import Neovis from 'neovis.js'
@Injectable({
  providedIn: 'root'
})

export class NeovisService {

  constructor() { }

 //function draw(), which draw nodes, using desired configuration
 draw(university:University,researchers:Researcher[],years:number[]) {

  let query = null;

  if ((years[0]==environment.year.from && years[1]==environment.year.to)){

       query = `MATCH (i:Institution{name:"${university}"})-[]-(a1:Author)-[co:COAUTHOR_WEIGHT]-(a2:Author) WHERE id(a1) IN [${researchers}] return a1,co,a2`;
  }
    else{
        
        years = _.range(years[0],years[1]+1);
        query = `MATCH (i:Institution{name:"${university}"})-[]-(a1:Author)-[co:COAUTHOR]-(a2:Author) WHERE id(a1) IN [${researchers}] AND co.year IN [${years}] return a1,co,a2`;
  }
 

  //variable which will define the network
  var config = {
  container_id: "viz",
  server_url: environment.HOST_PORT,
  server_user: environment.USER,
  server_password: environment.PASSWORD,
  

  //defining labels of nodes
  labels: {
      "Author":{
          //caption shown on nodes
          "caption": "name",
          // defines colors based in atribute 'louvain_undirected'
          "community" :"louvain_undirected",
          // size defined in atribute 'degree'
          "size":"degree_undirected",

          // what will shown when hover mouse pointer to node
           "title_properties":["name","title","areas","lattesurl"],
          },
      "Institution":{
          "caption": "name",
          "title_properties": ["name"]
          // "size": "pageRank",
          // "community" :"louvain",
          // "title_properties": ["name"],
          // "size": "degree",
        
      },
      "Publication":{
        "caption": "type",
        "title_properties":["title","type","author","year"],
        // "size": "pageRank",
        // "community" :"louvain",
        // "title_properties": ["name"],
        // "size": "degree",
      
    }

      },

  //defining relationships of nodes
  relationships: {

      "ASSOCIATED_TO": {
         
          "caption": false,
          //"thickness":
          
      },
      "AUTHORING":{
         
          "caption": true
      },
      "COAUTHOR":{
     
      "caption": false,
      
      },
      "COAUTHOR_WEIGHT": {
         
          "caption": false,
           "thickness":"weight"
          
      }
  },
  
  // query to neovis draw
  initial_cypher: query,
  
};

  var viz = new Neovis(config);
  
  return viz;

}

}
