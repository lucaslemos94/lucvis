import { Component, OnInit, ViewChild } from '@angular/core';
import { GraphService } from './graph.service';
import { DataService } from 'src/app/services/data.service';
import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor(private graphService:GraphService, private dataService:DataService)  {}
  
  // variables
  viz:any;
  myForm:any;
  @ViewChild('fullScreen') divRef;
  isHidden: boolean = true;
  spinner: boolean = true;
  result: boolean = false;
  

  ngOnInit(): void {

    // retrieve form data
    this.myForm =  this.dataService.retrieveForm();
    
    // initiate a service to draw graph
    this.viz = this.graphService.draw(this.myForm.university,this.myForm.researchers,this.myForm.year);

    this.viz.render();
    
    this.isHidden=false;
    setTimeout(()=>{                           //<<<---using ()=> syntax
      this.spinner =  false;
    }, 2000)
    
    
    
    // render the visualization
    // if (this.result == true){

    //   // this.spinner = false;
    //   this.isHidden = false;
    //   this.spinner = false;
    // }

   
    


  }

  // on destroy, clear the draw network
  ngOnDestroy(){this.viz.clearNetwork();}

  // stabilize visualization, stopping interactions
  stabilizeNetwork(){ this.viz.stabilize();}

  // reload last visualization request
  reloadNetwork(){this.viz.reload();}

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


