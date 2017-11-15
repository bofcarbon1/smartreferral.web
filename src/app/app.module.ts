import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,
  ReactiveFormsModule,
  FormBuilder, 
  FormGroup,
  FormControl,
  Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './routes';
import { NetCore2Service } from './netcore2.service';
import { DataShareService } from './data.share.service';
import { GlobalVarService } from './global.var.service';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { CandidateHome } from './candidate/candidateHome';
import { UpdCandidate } from './candidate/update.candidate';
import { DelCandidate } from './candidate/delete.candidate';
import { Home } from './home/home';
import { SkillHome } from './skill/skill.home';
import { UpdSkill } from './skill/update.skill';
import { DelSkill } from './skill/delete.skill';
import { UpdSkillCategory } from './skill/update.skill.category';
import { DelSkillCategory } from './skill/delete.skill.category';
import { CandidateSkillHome } from './candidate/candidate.skill.home';
import { UpdCandidateSkill } from './candidate/update.candidate.skill';
import { AddCandidateSkill } from './candidate/add.candidate.skill';
import { DelCandidateSkill } from './candidate/delete.candidate.skill';
import { CandidateReport } from './reports/candidate.report';
import { SkillMatchReport } from './reports/skill.match.report';
import { OrderByPipe } from './order.by.pipe';
import { NumberValidatorsService } from "./services/validation/number.validator.service";
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent, CandidateHome, UpdCandidate, DelCandidate, 
    Home, SkillHome, UpdSkill, DelSkill, UpdSkillCategory, 
    DelSkillCategory, CandidateSkillHome, UpdCandidateSkill,
    AddCandidateSkill, DelCandidateSkill, CandidateReport,
    OrderByPipe, SkillMatchReport 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MultiselectDropdownModule,
    NgxPaginationModule
    
  ],
  providers: [NetCore2Service, GlobalVarService, DataShareService,
    NumberValidatorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

