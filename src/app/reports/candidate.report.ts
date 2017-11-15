import {Component,  OnInit} from '@angular/core';
import { Http, 
  Response, 
  RequestOptions, 
  HttpModule, 
  Headers } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NetCore2Service } from '../netcore2.service';
import { DataShareService } from '../data.share.service';
import { GlobalVarService } from '../global.var.service';
import { Candidate } from '../candidate/candidate';
import { CandidateSkill } from '../candidate/candidate.skill';
import { appRoutes } from '../routes';

@Component({
  selector: 'candidate.report',
  templateUrl: './candidate.report.html',
  styles: [
    `
    p {
       font-size: .80em;
    }
    
    table {
      border: 1px solid black;
      font-size: .80em;
    }
    
    .pointer{
    cursor: pointer;
    }
    
   ` 
    
  ]
})

export class CandidateReport implements OnInit {
  records: Array<any>;
  public obsCandidates: string; //Used to get candidates from observable 
  selectedCandidate: Candidate; //Used to set detail for selected candidate
  public allcandidateskills:string;
  public obsCandidateSkills:string;
  preScreenPct: number; //Used in point calculations
  codeSamplePct: number; //Used in point calculations
  videoPct: number; //Used in point calculations
  skillPct: number; //Used in point calculations
  preScreenCalcProd: number; //Used in point calculations
  codeSampleCalcProd: number; //Used in point calculations
  videoCalcProd: number; //Used in point calculations
  skillCalcProd: number; //Used in point calculations
  totalPtsProd: number; //Used in point calculations
  ptsIndex: number; //Used in point calculations
  direction: number; //Used in sorting table columns
  isDesc: boolean = false; //Used in sorting table columns
  column: string = 'candidate_name';
  p: number = 1; //for table pagination
  
  constructor(public netcore2service : NetCore2Service,
    datashareservice: DataShareService,
    globalvarservice: GlobalVarService) {
    this.preScreenPct = globalvarservice.gvCriteriaPreScreenPct;
    this.codeSamplePct = globalvarservice.gvCriteriaCodeSamplePct;
    this.videoPct = globalvarservice.gvCriteriaVideoPct;
    this.skillPct = globalvarservice.gvCriteriaSKillPct;
  }
  
  ngOnInit() {
    var initCandidate = new Candidate;
    initCandidate.candidate_name = "No Candidate Selected";
    initCandidate.candidate_note = "No summary details";
    initCandidate.candidate_phone = "No phone";
    initCandidate.candidate_email = "No email";
    this.setCandidateDetails(initCandidate);
    this.getCandidates();
  }
  
  private getCandidates(): void {
    //Get the candidate individual details
    this.netcore2service
      .GetCandidates()
      .subscribe(data => this.obsCandidates = data,
        error => console.log(error),
        () => {
          var candidateString = JSON.stringify(this.obsCandidates);
          var candidateParsed = JSON.parse(candidateString);
          var candidateArray = candidateParsed.result;
          this.ptsIndex = 0;
          this.records = candidateArray;
          for (let value of candidateArray) {
            this.skillCalcProd = value.candidate_skill_level * this.skillPct;
            this.preScreenCalcProd = value.candidate_screen_level * this.preScreenPct;
            this.codeSampleCalcProd = value.candidate_code_sample_level * this.codeSamplePct;
            this.videoCalcProd = value.candidate_video_level * this.videoPct;
            this.totalPtsProd = this.skillCalcProd + this.preScreenCalcProd + 
              this.codeSampleCalcProd + this.videoCalcProd;
            this.records[this.ptsIndex]['totalPts'] = this.totalPtsProd;
            this.ptsIndex = this.ptsIndex + 1;
          }
        }
      );
  }
  
  //Set the selected candidate details for display
  //We also get the skills based on the cadidate ID
  setCandidateDetails(candidate: Candidate){
    this.selectedCandidate = candidate;
    this.getCandidateSkills();
  }
  
    private getCandidateSkills(): void {
    this.netcore2service
      .GetCandidateSkills("Candidate", this.selectedCandidate.candidate_ID)
      .subscribe(data => this.obsCandidateSkills = data,
        error => console.log(error),
        () => {
          var candidateSkillString = JSON.stringify(this.obsCandidateSkills);
          var candidateSkillParsed = JSON.parse(candidateSkillString);
          var candidateSkillArray = candidateSkillParsed.result;
          this.allcandidateskills = candidateSkillArray;
        }
      );
  }
  
  sort(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
  
} 