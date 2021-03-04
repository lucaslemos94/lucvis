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
  year: FormArray;


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
     year:this.fb.array([],Validators.required)
    
  })
  this.createYear();
  
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

// create a new venue control, if field is checked
// onChange(venue: string, isChecked: boolean) {

//   const venuesFormArray = (this.myForm.controls.venues as FormArray);

//   if (isChecked) {
//     venuesFormArray.push(new FormControl(venue));
//   } else {
//     const index = venuesFormArray.controls.findIndex(x => x.value == venue);
//     venuesFormArray.removeAt(index);
//   }
// }


// get all seeds with given university
getSeeds():void{ 

    // empty array if not empty already
    if(this.researchers.length > 0 ) this.researchers=[];
    
    // get researchers with given university
    const university = this.myForm.get('university').value;
    this.neo4jService.getSeeds(university,this.researchers);

  }

// navigate to graph component
navigateToGraphComponent(): void{
    
  // save form data before go next component
  this.dataService.saveForm(this.myForm.value);

  this.router.navigate(['socialnetwork/graph/force']);

}

// navigate to home component
navigateToHomeComponent():void{
  this.router.navigate(['']);
}

// destroy the component, emptying arrays
ngOnDestroy():void{
  this.universitys=[];
  this.researchers=[];
}

}