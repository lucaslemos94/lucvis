import { Component, OnInit } from '@angular/core';

import sigma from 'sigma'
import { Neo4jService } from 'src/app/services/neo4j.service';
import { Year } from 'src/model/year.model';
declare const sigma:any;

@Component({
  selector: 'app-sigma',
  templateUrl: './sigma.component.html',
  styleUrls: ['./sigma.component.css']
})
export class SigmaComponent implements OnInit {
  
  pesquisadores:any[]=[242,238];
  universidade:string='UnB'
  s:any;
  years:any

  constructor(private neo4jService:Neo4jService) { }

 ngOnInit(){

  this.graphData(this.universidade,this.pesquisadores,this.years).then(graph=>{
    this.draw(graph);
  });

}

draw(graph:any){
  this.s = new sigma(
    {
      renderer: {
         graph:graph,
         container: document.getElementById('sigma-child'),
         type: 'canvas'
       },
       settings: {
        doubleClickEnabled: true,
        // minEdgeSize: 0.5,
        // maxEdgeSize:999,
        minNodeSize:1,
        // minNodeSize:1,
        enableEdgeHovering: true,
        edgeHoverColor: 'edge',
        defaultEdgeHoverColor: '#000',
        edgeHoverSizeRatio: 1,
        edgeHoverExtremities: true,
        edgeColor:'default',
        defaultEdgeColor:'grey'
        
      }
     }
   );

  // // Load the graph in sigma
  this.s.graph.read(graph);
  // // Ask sigma to draw it
  this.s.refresh();

  // Initialize the dragNodes plugin:
var dragListener = sigma.plugins.dragNodes(this.s, this.s.renderers[0]);

dragListener.bind('startdrag', function(event) {
// console.log(event);
});
dragListener.bind('drag', function(event) {
// console.log(event);
});
dragListener.bind('drop', function(event) {
// console.log(event);
});
dragListener.bind('dragend', function(event) {
// console.log(event);
});

// Bind the events:
this.s.bind('overNode outNode  doubleClickNode rightClickNode', function(e) {
// console.log(e.type, e.data.node.label, e.data.captor);
});
this.s.bind('overEdge outEdge doubleClickEdge rightClickEdge', function(e) {
// console.log(e.type, e.data.edge, e.data.captor);
});

}

async graphData(university:any,researchers:any,years:number[]){

  const result =  await this.neo4jService.getNetwork(university,researchers,years);

  console.log(result)

  const duplicateEdges = result.records.map(r => {return {id:r.get('co').identity.low,source:r.get('co').start.low, target:r.get('co').end.low}});

  const duplicateNodes = [];

  result.records.forEach(r => { 
    duplicateNodes.push({id: r.get('a1').identity.low, label: r.get('a1').properties.name,x:Math.random(),y:Math.random(),size:r.get('a1').properties.degree_undirected/100,color:'red'});
    duplicateNodes.push({id: r.get('a2').identity.low, label: r.get('a2').properties.name,x:Math.random(),y:Math.random(),size:r.get('a2').properties.degree_undirected/100,color:'blue'});
  });

  const graph={nodes:this.getUnique(duplicateNodes,'id'),edges:this.getUnique(duplicateEdges,'id')};

  return graph;

}


getUnique(arr:any, comp:any) {

  // store the comparison  values in array
  const unique =  arr.map(e => e[comp])

  // store the indexes of the unique objects
  .map((e, i, final) => final.indexOf(e) === i && i)

  // eliminate the false indexes & return unique objects
  .filter((e) => arr[e]).map(e => arr[e]);


  return unique;
  
}


}