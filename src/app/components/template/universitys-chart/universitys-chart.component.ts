import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-universitys-chart',
  templateUrl: './universitys-chart.component.html',
  styleUrls: ['./universitys-chart.component.css']
})
export class UniversitysChartComponent implements OnInit {


  // pieChartLabels:string[];
  // pieChartData:number[];
  // pieChartType:string = 'pie';
  // pieChartOptions:any;

  constructor() { }

  ngOnInit(): void {
    //  this.createChart();
  }

  // createChart(){
    
  public pieChartLabels= ["UnB", "USP", "UFRN", "UFAM", "UFMG"];
  public pieChartData = [26, 38, 24, 36, 55];
  public pieChartType= 'pie';
  public pieChartOptions= {'backgroundColor': [
               "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB"
            ],
            padding:100
  
}

}