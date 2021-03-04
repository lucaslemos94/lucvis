import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-researcher-report',
  templateUrl: './researcher-report.component.html',
  styleUrls: ['./researcher-report.component.css']
})
export class ResearcherReportComponent implements OnInit {

  constructor(private dataService:DataService) { }

  formData:any;

  ngOnInit(): void {
    
    this.formData=this.dataService.retrieveObj()
    
  }

}
