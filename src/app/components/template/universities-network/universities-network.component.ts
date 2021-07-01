import { Component, OnInit } from '@angular/core';
import ForceGraph3D from '3d-force-graph';
import { Neo4jService } from 'src/app/services/neo4j.service';
import  SpriteText  from 'three-spritetext';
import {CSS2DRenderer, CSS2DObject} from 'three-css2drender'

@Component({
  selector: 'app-universities-network',
  templateUrl: './universities-network.component.html',
  styleUrls: ['./universities-network.component.css']
})
export class UniversitiesNetworkComponent implements OnInit {
  
  graph:any=undefined;

  constructor(private neo4jService:Neo4jService) { }

  ngOnInit(): void {
    // get graph data then draw
    this.graphData().then(graph=>{
      this.draw(graph);
    
    });
  }


  // draw graph
  draw(graphData:any){

    this.graph = ForceGraph3D({extraRenderers: [new CSS2DRenderer()]})
       (document.getElementById('viz'))
      .graphData(graphData)
      .nodeLabel('label')
      .nodeVal('size')
      .linkColor('color')
      .linkWidth(1)
      .linkCurvature('curvature')
      .backgroundColor('lightgrey')
      .nodeThreeObjectExtend(true)
      .nodeThreeObject(node => {
        const transform = <any>node;
        const nodeEl = document.createElement('div');
        nodeEl.textContent = transform.label;
        // nodeEl.style.color = node
         nodeEl.className = 'node-label';
        return new CSS2DObject(nodeEl);
      })
      .linkThreeObjectExtend(true)
      .linkPositionUpdate((sprite, { start, end }) => {

        const middlePos = Object.assign(start,...['x', 'y', 'z'].map(c => ({
          [c]: start[c] + (end[c] - start[c]) / 2 })));
          
        // Position sprite
        Object.assign(sprite.position, middlePos);

        
        return true;
      });
      
       // Spread nodes a little wider
    this.graph.d3Force('charge').strength(-120);
    
    //  this.graph.width(400);
		//  this.graph.height(400);


    this.setLinksNames();
  }

   setLinksNames() {
    this.graph.linkThreeObject((link) => {
      // extend link with text sprite
      const sprite = new SpriteText(`${link.value}`);
      sprite.color = "black";
      sprite.textHeight = 2.5;
      return sprite;
    });
  }
  
  async graphData(){

    // const result =  await this.neo4jService.getUniversitiesNetwork();

    const duplicateNodes = [];
    const edges =[];

    // result.records.forEach(r => { 
    //   duplicateNodes.push({id: r.get('ID(i1)').low, label: r.get('i1.name'),color:r.get('i1.color')});
    //   duplicateNodes.push({id: r.get('ID(i2)').low, label: r.get('i2.name'),color:r.get('i2.color')});
    //   edges.push({source: r.get('ID(i1)').low, target:r.get('ID(i2)').low,value:r.get('count(p)'),color:'black'});
    // });

      duplicateNodes.push({id: 1, label: 'UnB',color:'#E466CB'});
      duplicateNodes.push({id: 2, label: 'UFAM',color:'#00FFFF'});
      duplicateNodes.push({id: 3, label: 'UFMG',color:'#FFFF00'});
      duplicateNodes.push({id: 4, label: 'USP',color:'#800000'});
      duplicateNodes.push({id: 5, label: 'UFRN',color:'#89F6C7'});

      duplicateNodes.push({id: 111, label: 'UnB',color:'#E466CB'});
      duplicateNodes.push({id: 222, label: 'UFAM',color:'#00FFFF'});
      duplicateNodes.push({id: 333, label: 'UFMG',color:'#FFFF00'});
      duplicateNodes.push({id: 444, label: 'USP',color:'#800000'});
      duplicateNodes.push({id: 555, label: 'UFRN',color:'#89F6C7'});

      edges.push({source:1, target:111, value:512,color:'black'})
      edges.push({source:2, target:222, value:764,color:'black'})
      edges.push({source:3, target:333, value:3498,color:'black'})
      edges.push({source:4, target:444, value:564,color:'black'})
      edges.push({source:5, target:555, value:526,color:'black'})

      edges.push({source:1, target:3, value:67,color:'black'})
      edges.push({source:1, target:5, value:27,color:'black'})
      edges.push({source:1, target:4, value:9,color:'black'})
      
      edges.push({source:2, target:3, value:410,color:'black'})
      edges.push({source:2, target:4, value:12,color:'black'})
      
      edges.push({source:3, target:2, value:410,color:'black'})
      edges.push({source:3, target:4, value:3,color:'black'})
      edges.push({source:3, target:5, value:28,color:'black'})
      edges.push({source:3, target:1, value:67,color:'black'})
      
      edges.push({source:4, target:5, value:1,color:'black'})

    const graph={nodes:this.getUnique(duplicateNodes,'id'),links:edges};

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

function extraRenderers(extraRenderers: any, arg1: any[]) {
  throw new Error('Function not implemented.');
}
