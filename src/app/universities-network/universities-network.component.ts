import { Component, OnInit } from '@angular/core';
import ForceGraph3D from '3d-force-graph';

@Component({
  selector: 'app-universities-network',
  templateUrl: './universities-network.component.html',
  styleUrls: ['./universities-network.component.css']
})
export class UniversitiesNetworkComponent implements OnInit {

  graph:any;
  graphData:{};

  constructor() { }

  ngOnInit(): void {
  }


  // draw graph
  draw(graphData:any){

    this.graph = ForceGraph3D()
       (document.getElementById('viz'))
      .graphData(graphData).nodeLabel('label')
      .nodeAutoColorBy('group')
      .nodeVal('size')
      
    }

}
