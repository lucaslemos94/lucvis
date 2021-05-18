import { Component, OnInit } from '@angular/core';
import{ Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

import { University } from 'src/model/university.model';
import { Researcher } from 'src/model/researcher.model';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Neo4jService } from 'src/app/services/neo4j.service';



@Component({
  selector: 'app-social-network',
  templateUrl: './social-network.component.html',
  styleUrls: ['./social-network.component.css']
})
export class SocialNetworkComponent implements OnInit {

  constructor(private router:Router,private neo4jService:Neo4jService, private dataService:DataService,private fb:FormBuilder) {}

  // variables
  universitys:University[]=[];
  researchers:Researcher[]=[];
  myForm:FormGroup;
  rangeValues: number[] = [1973,2021];
  visualizators:any[]=[
    {name:'3D-force',value:0},
    // {name:'Neovis',value:1}
  ]

  // function thats called upon component starts
  ngOnInit(): void {
    
    //populate arrays and build form
    this.neo4jService.getUniversitys(this.universitys);
    this.buildForm();

  }

  // create a form to get data
  buildForm(){

     this.myForm = this.fb.group({
     university:[[null],Validators.required],
     researchers:[[null],Validators.required],
     year:[[1973,2021],Validators.required],
     visualizator:[null,Validators.required]
    
  })
  // this.createYear();

  //every chenge in fiel year, set in rangeValues too.
  this.myForm.get("year").valueChanges.subscribe(val => {
   
    this.rangeValues[0] = val[0];
    this.rangeValues[1] = val[1];
  });
}

// create an year control, then add to formArray of years
createYear(){

  const yearControl =  this.fb.group({
   from:[null,Validators.required],
   to:[null,Validators.required],
 });

    const yearFormArray = (this.myForm.controls.year as FormArray);
    yearFormArray.push(yearControl);
   
}

// get all seeds with given university
getSeeds():void{ 

    // empty array if not empty already
    if(this.researchers.length > 0 ) this.researchers=[];
    
    // get researchers with given university
    const university = this.myForm.get('university').value;
    this.neo4jService.getSeeds(university,this.researchers);

  }

navigateToGraphComponent(): void{
    
  // save form data before go next component
  this.dataService.saveForm(this.myForm.value);

  switch (this.myForm.value.visualizator) {
    
    case 0:
    
    this.router.navigate(['socialnetwork/graph/force']);
      
    break;
    
    case 1:

    this.router.navigate(['socialnetwork/graph/neovis']);
  
    break;
    
  }

}


navigateToHomeComponent():void{this.router.navigate(['']);}

// destroy the component, emptying arrays
ngOnDestroy():void{
  this.universitys=[];
  this.researchers=[];

}

}