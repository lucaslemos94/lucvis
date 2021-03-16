import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor() { }

  myForm:any;
  obj:any

  //save form data
  saveForm(myForm:any){
    return this.myForm = myForm;
  }

  // retrieve form data
  retrieveForm(){
    return this.myForm;
  }

  //save object
  saveObj(obj:any){
    this.obj = obj;
  }

  //retrieve object
  retrieveObj(){
    return this.obj;
  }
  
}
