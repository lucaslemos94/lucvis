import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// importing components
import{HomeComponent} from './views/home/home.component';
import {SocialNetworkComponent}from'./views/social-network/social-network.component';
import {GraphComponent}from'./views/graph/neovis/graph.component';
import { FindResearcherComponent } from './views/find-researcher/find-researcher.component';
import { ResearcherReportComponent } from './views/researcher-report/researcher-report.component';
import { TableResearchersComponent } from './components/template/table-researchers/table-researchers.component';
import { ForceComponent } from './views/graph/3d-force/force.component';

// configuring routes
const routes: Routes = [
      
      {path:"", component:HomeComponent},
      {path:"socialnetwork", component:SocialNetworkComponent},
      {path:"socialnetwork/graph",component:GraphComponent},
      {path:"findresearcher",component:FindResearcherComponent},
      {path:"findresearcher/tableresearchers",component:TableResearchersComponent},
      {path:"findresearcher/researcherreport",component:ResearcherReportComponent},
      {path:"socialnetwork/graph/force",component:ForceComponent},
      
    
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
