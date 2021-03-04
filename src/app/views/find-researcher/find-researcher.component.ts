import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-find-researcher',
  templateUrl: './find-researcher.component.html',
  styleUrls: ['./find-researcher.component.css']
})
export class FindResearcherComponent implements OnInit {

  constructor(private router:Router,private fb:FormBuilder,private dataService:DataService) { }

  // variables
  myForm:FormGroup;

  ngOnInit(): void {

    this.buildForm();

  }

  // building form
  buildForm(){
    this.myForm=this.fb.group({
      nameResearcher:[null,[Validators.minLength(2),Validators.required]],
      
    })
  }

  // navigate to next component
  navigateToResearcherReportComponent(){
  
  // save form data before navigate
  this.dataService.saveForm(this.myForm.value);

  this.router.navigate(['findresearcher/tableresearchers']);
    
  }

  // navigate to home component
  navigateToHomeComponent(){
    this.router.navigate(['/'])
  }
}
