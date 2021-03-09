import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts'
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { DataService } from 'src/app/services/data.service';
import { Neo4jService } from 'src/app/services/neo4j.service';


@Component({
  selector: 'app-chart-coauthoring',
  templateUrl: './chart-coauthoring.component.html',
  styleUrls: ['./chart-coauthoring.component.css']
})
export class ChartCoauthoringComponent implements OnInit {

  constructor(private neo4jService:Neo4jService,private dataService:DataService) { }

  // Variables
  years:string[]=[];
  authorCoauthorShip:any[]=[];
  medium:number[]=[];
  highest:number[]=[];
  lowest:number[]=[];
  publications:any[]=[];
  loaded: boolean = false;
  

  ngOnInit() {

    // getting object saved from previous component
    const researcher = this.dataService.retrieveObj();
    
    if(researcher.seed){
    
    this.neo4jService.getCoauthoring(researcher.id).then(el =>{

      console.log(el)

      el[0].records.forEach( record =>{
        this.years.push(record._fields[1].low);
        this.authorCoauthorShip.push(record._fields[0].low)
      });

      el[1].records.forEach( record =>{
       
        this.medium.push(record._fields[0].low)
        
      });

      el[2].records.forEach( record =>{
       
        this.lowest.push(record._fields[0].low)
        this.highest.push(record._fields[1].low)
        
      });

      this.loaded = true;

      
      })}
      
      // else if (!(researcher.seed)){
  
      //   this.dataService.getPublication(researcher.id).then(el =>{
      //     el[0].records.forEach( record =>{
      //       this.years.push(record._fields[0].low);
      //       this.publications.push(record._fields[1].low)
            
      //     })
    
      //   })
  
      // }
      
}
  

   barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };


  // public barChartLabels: Label[] = ["2006", "2007", '2008', '2009', '2010', '2011', '2012'];
  public barChartLabels: Label[] = this.years;

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartColors: Color[] = [
    { backgroundColor: '#99CCFF' },
    { backgroundColor: '#FF9999' },
    { backgroundColor: '#FFFF99' },
    { backgroundColor: '#CCFF99' },
  ]


  public barChartData: ChartDataSets[] = [
    { data: this.authorCoauthorShip, label: 'Author Coauthorship' },
    {data:this.lowest,label:'Lowest Coauthorsip'},
    { data: this.medium, label: 'Medium Coauthorship' },
    { data:this.highest, label: 'Highest Coauthorship'},
  ];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
