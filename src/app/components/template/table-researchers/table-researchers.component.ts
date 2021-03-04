import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Researcher } from 'src/model/researcher.model';
import { Neo4jService } from 'src/app/services/neo4j.service';

@Component({
  selector: 'app-table-researchers',
  templateUrl: './table-researchers.component.html',
  styleUrls: ['./table-researchers.component.css']
})
export class TableResearchersComponent implements OnInit {

  constructor(private dataService:DataService,private neo4jService:Neo4jService,private router:Router) { }
  
  
  // variables
  displayedColumns: string[] = ['name'];
  researchers:Researcher[];
  dataSource:any;
  row:Researcher={};
  dataIsLoaded:boolean=false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {

    // retrieve string from form
    const formData=this.dataService.retrieveForm();

    // get researchers from given name from user
    const researchers:Researcher[]=[];

    // consume the promise result
    this.neo4jService.getResearchers(formData.nameResearcher).then(result =>{

      console.log(result)

    result.records.forEach(record => {
      researchers.push({id: record.get('id').low, name:record.get('name'),seed:record.get('seed')})
      
    });

  
    //   // getting id,name and seed status from result
    //   result.records.forEach(element => {
    //         researchers.push({id:element._fields[0].low,name:element._fields[1],seed:element._fields[2]})
    // });
    
    }
    // set data to table
    ).then(()=> this.setDataTable(researchers))

  
 
  }
  
  // set the table data
  setDataTable(researchers:Researcher[]){

    this.researchers=researchers;
    const dataSource =  new MatTableDataSource<Researcher>(this.researchers);
    dataSource.paginator = this.paginator;

    this.dataSource = dataSource;

    this.dataIsLoaded=true;

  }

  // navigate to another component
  navigate(row:Researcher):void{
    
    this.row = row;
    
    // save the object which contains selected researcher from table to use on next charts
    this.dataService.saveObj(this.row)
    
    this.router.navigate(['findresearcher/researcherreport']);
  
  }

  // on destroy, empty arrays
  ngOnDestroy(){

    this.dataSource=[];
    this.researchers=[];

  }

}
