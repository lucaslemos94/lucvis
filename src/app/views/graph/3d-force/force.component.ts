import { Component, OnInit } from '@angular/core';
import ForceGraph3D from '3d-force-graph';
import { Neo4jService } from 'src/app/services/neo4j.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-force',
  templateUrl: './force.component.html',
  styleUrls: ['./force.component.css']
})
export class ForceComponent implements OnInit {

  n = 300;
  graph:any;
  
  // driver =  neo4j.driver(environment.HOST_PORT,neo4j.auth.basic(environment.USER,environment.PASSWORD));

  constructor(private neo4jService:Neo4jService,private dataService:DataService) { }

  ngOnInit(): void {

    
    const researchers:any[]=[];

    // retrieve form data
    const myForm =  this.dataService.retrieveForm();
    console.log(myForm)
    
    this.graphData(myForm.university,myForm.researchers).then(graph=>{
      this.draw(graph);
    });

  }

  ngOnDestroy(){
    this.graph._destructor();
    
  }


  

  async graphData(universitys:any,researchers:any[]){

    const result =  await this.neo4jService.getNetwork(universitys,researchers);
    
    const duplicateEdges = result.records.map(r => {return {id:r.get('co').identity.low,source:r.get('co').start.low, target:r.get('co').end.low}});
  
    const duplicateNodes = [];
  
    result.records.forEach(r => { 
      duplicateNodes.push({id: r.get('a1').identity.low, label: r.get('a1').properties.name,x:Math.random(),y:Math.random(),size:r.get('a1').properties.louvain_undirected});
      duplicateNodes.push({id: r.get('a2').identity.low, label: r.get('a2').properties.name,x:Math.random(),y:Math.random(),size:r.get('a2').properties.louvain_undirected});
    });
  
    const graph={nodes:this.getUnique(duplicateNodes,'id'),links:this.getUnique(duplicateEdges,'id')};
    
    console.log(graph)

    return graph;
  
  }
  
  
getUnique(arr, comp) {

  // store the comparison  values in array
const unique =  arr.map(e => e[comp])

// store the indexes of the unique objects
.map((e, i, final) => final.indexOf(e) === i && i)

// eliminate the false indexes & return unique objects
.filter((e) => arr[e]).map(e => arr[e]);

return unique;
}


draw(graphData:any){


 this.graph = ForceGraph3D({controlType: 'orbit'})
  (document.getElementById('graph'))
    .graphData(graphData).nodeLabel('label')
    .nodeAutoColorBy('size')
    // .linkColor(() => 'whi')
    // // .backgroundColor('white')
  
  }

}
