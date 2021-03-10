// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

// components
import { HeaderComponent } from './components/template/header/header.component';
import { NavComponent } from './components/template/nav/nav.component'
import {HomeComponent} from './views/home/home.component'
import { FooterComponent } from './components/template/footer/footer.component';
import {SocialNetworkComponent} from './views/social-network/social-network.component';
import { GraphComponent } from './views/graph/neovis/graph.component';
import { FindResearcherComponent } from './views/find-researcher/find-researcher.component';
import { SelectCheckAllComponent } from './components/template/select-check-all/select-check-all.component';
import { ResearcherReportComponent } from './views/researcher-report/researcher-report.component';
import { ChartCoauthoringComponent } from './components/template/chart-coauthoring/chart-coauthoring.component';
import { ChartPublicationComponent } from './components/template/chart-publication/chart-publication.component'
import { TableResearchersComponent } from './components/template/table-researchers/table-researchers.component';

// material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio';
import { ChartsModule } from 'ng2-charts';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SigmaComponent } from './views/graph/sigma/sigma.component';
import { ForceComponent } from './views/graph/3d-force/force.component';

import {SliderModule} from 'primeng/slider';



// import { AngularNeo4jModule } from 'angular-neo4j';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    SocialNetworkComponent,
    GraphComponent,
    FindResearcherComponent,
    SelectCheckAllComponent,
    ResearcherReportComponent,
    ChartCoauthoringComponent,
    TableResearchersComponent,
    ChartPublicationComponent,
    SigmaComponent,
    ForceComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule,
    ChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    SliderModule 
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
