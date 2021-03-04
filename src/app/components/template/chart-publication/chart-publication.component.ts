import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts'
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Neo4jService } from 'src/app/services/neo4j.service';

@Component({
  selector: 'app-chart-publication',
  templateUrl: './chart-publication.component.html',
  styleUrls: ['./chart-publication.component.css']
})
export class ChartPublicationComponent implements OnInit {

  constructor(private dataService:DataService,private neo4jService:Neo4jService) { }

  years:string[]=[];
  publications:any[]=[];
  loadedPublications: boolean = false;

  ngOnInit() {

    this.getPublications();

  }

  ngOnDestroy(){
    this.years=[];
    this.publications=[];
    this.loadedPublications=false;
  }

  getPublications(){

    const researcher = this.dataService.retrieveObj();

    this.neo4jService.getPublications(researcher.id).then(el =>{

  
      el[0].records.forEach( record =>{
        this.years.push(record._fields[1]);
        this.publications.push(record._fields[0].low)
        
      })

      this.loadedPublications =true;
      
      })

  }

   barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{ticks:{
      stepSize:1
    }}] },
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
    { data: this.publications, label: 'Author Publications' },
  ];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
