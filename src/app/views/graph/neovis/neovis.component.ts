import { Component, OnInit, ViewChild } from '@angular/core';
import { NeovisService } from './neovis.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-neovis',
  templateUrl: './neovis.component.html',
  styleUrls: ['./neovis.component.css']
})
export class NeovisComponent implements OnInit {

  constructor(private neovisService:NeovisService, private dataService:DataService)  {}
  
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
    this.viz = this.neovisService.draw(this.myForm.university,this.myForm.researchers,this.myForm.year);

    this.viz.render();
    
    this.isHidden=false;
    setTimeout(()=>{                           //<<<---using ()=> syntax
      this.spinner =  false;
    }, 2000)
    
    
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


