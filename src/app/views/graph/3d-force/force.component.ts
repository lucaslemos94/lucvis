import { Component, OnInit, ViewChild } from '@angular/core';
import ForceGraph3D from '3d-force-graph';
import { Neo4jService } from 'src/app/services/neo4j.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-force',
  templateUrl: './force.component.html',
  styleUrls: ['./force.component.css']
})
export class ForceComponent implements OnInit {
  
  graph:any;
  dataIsLoaded:Boolean=false;
  @ViewChild('fullScreen') divRef;
  
  constructor(private neo4jService:Neo4jService,private dataService:DataService) { }

  ngOnInit(): void {

    // retrieve form data
    const myForm =  this.dataService.retrieveForm();

    // get graph data then draw
    this.graphData(myForm.university,myForm.researchers,myForm.year).then(graph=>{
      this.draw(graph);
      this.dataIsLoaded=true;
    });

  }

  ngOnDestroy(){this.graph._destructor(); this.dataIsLoaded=false}

  async graphData(universitys:any,researchers:any[],years:number[]){

    const result =  await this.neo4jService.getNetwork(universitys,researchers,years);

   
    const duplicateEdges = result.records.map(r => {return {id:r.get('co').identity.low,source:r.get('co').start.low, target:r.get('co').end.low}});
  
    const duplicateNodes = [];
  
    result.records.forEach(r => { 
      duplicateNodes.push({id: r.get('a1').identity.low, label: r.get('a1').properties.name,group:r.get('a1').properties.louvain_undirected.low,size:r.get('a1').properties.degree_undirected/20});
      duplicateNodes.push({id: r.get('a2').identity.low, label: r.get('a2').properties.name,group:r.get('a2').properties.louvain_undirected.low,size:r.get('a2').properties.degree_undirected/20});
    });
  
    const graph={nodes:this.getUnique(duplicateNodes,'id'),links:this.getUnique(duplicateEdges,'id')};
    
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

  // draw graph
  draw(graphData:any){

    

    this.graph = ForceGraph3D()
       (document.getElementById('viz'))
      .graphData(graphData).nodeLabel('label')
      .nodeAutoColorBy('group')
      .nodeVal('size')
      
    }

     // perform fullscreen
  openFullscreen() {
    // Use this.divRef.nativeElement here to request fullscreen
    const elem = this.divRef.nativeElement;
  
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }



}
