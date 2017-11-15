import {Host,
Component,  
OnInit} from '@angular/core';
import { Http, 
  Response, 
  RequestOptions, 
  HttpModule, 
  Headers } from '@angular/http';
import { RouterModule } from '@angular/router';
import { IMultiSelectOption, 
  IMultiSelectTexts, 
  IMultiSelectSettings} from 'angular-2-dropdown-multiselect';
import { NetCore2Service } from '../netcore2.service';
import { Candidate } from '../candidate/candidate';
import { CandidateSkill } from '../candidate/candidate.skill';
import { Skill } from '../skill/skill';
import { appRoutes } from '../routes';

@Component({
  selector: 'skill.match.report',
  templateUrl: './skill.match.report.html',
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

export class SkillMatchReport implements OnInit {
  records: Array<any>;
  public obsCandidates: string; //Used to get candidates from observable 
  selectedCandidate: Candidate; //Used to set detail for selected candidate
  allcandidateskills:string;
  obsCandidateSkills:string;
  skillCount: number; //Used in skill match calculations
  skillMatchCount: number; //Used in skill match calculations
  skillMatchPct: number; //Used in skill match calculations
  matchIndex: number; //Used in skill match calculations
  direction: number; //Used in sorting table columns
  isDesc: boolean = false; //Used in sorting table columns
  column: string = 'candidate_name';
  p: number = 1; //for table pagination
  skillIndex: number; //Used in skill multi select building
  skillSelectArray: Array<any>;
  skillSelects: IMultiSelectOption[]; // used for multiselect skills
  obsSkills: Skill; //object for observable usage
  myTexts: IMultiSelectTexts; // used for multiselect skills
  mySettings: IMultiSelectSettings; //used for multiselect skills
  public optionsModel: number[]; //used to store selected skills 
  obsSkillsMatchCounts:string; //used in skill match count 
  prevCandidateID:string; //used in skill match count
  skillMCCount: number; //used in skill match count
  skillMCs: Array<any>; //used in skill match count bind to html
  firstPass: boolean; //used in skill match count 
  
  constructor(public netcore2service : NetCore2Service) {
   
  }
  
  ngOnInit() {
    
    // Candidate detail report section initializaiton
    var initCandidate = new Candidate;
    initCandidate.candidate_name = "No Candidate Selected";
    initCandidate.candidate_note = "No summary details";
    initCandidate.candidate_phone = "No phone";
    initCandidate.candidate_email = "No email";
    this.getSkills();
    this.setCandidateDetails(initCandidate);
    
    // Skill multi select text configuration
    this.myTexts = {
      checkAll: 'Select all',
      uncheckAll: 'Unselect all',
      checked: 'item selected',
      checkedPlural: 'items selected',
      defaultTitle: 'Select',
      allSelected: 'All selected',
    };
    
    // Skill multi select settings configuration
    this.mySettings = {
      checkedStyle: 'fontawesome',
      buttonClasses: 'btn btn-default btn-block',
      dynamicTitleMaxItems: 3,
      displayAllSelectedText: true
    };
    
  }
  
  private getSkills(): void {
    this.netcore2service
      .GetSkills()
      .subscribe(data => this.obsSkills = data,
        error => console.log(error),
        () => {
            var skillString = JSON.stringify(this.obsSkills);
            var skillParsed = JSON.parse(skillString);
            var skillArray = skillParsed.result;
            var skillArray2 = [];
            for (let value of skillArray) {
                skillArray2.push({"id": value.skill_ID, "name": value.skill_Name});
            }
            this.skillSelects = skillArray2;
        }
      );
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
          this.matchIndex = 0;
          this.records = candidateArray;
          for (let value of candidateArray) {
              var msc = this.checkMatchCount(value.candidate_ID);
              this.skillMatchPct = (msc / this.optionsModel.length) * 100;
              this.records[this.matchIndex]['matchPct'] = this.skillMatchPct;
              this.matchIndex = this.matchIndex + 1;
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
  
  private getSkillsMatchCounts(): void {
    this.netcore2service
      .GetSkillsMatchCounts(this.optionsModel)
      .subscribe(data => this.obsSkillsMatchCounts = data,
        error => console.log(error),
        () => {
            var skillMCString = JSON.stringify(this.obsSkillsMatchCounts);
            var skillMCParsed = JSON.parse(skillMCString);
            var skillMCArray = skillMCParsed.result;
            var skillMCArray2 = [];
            this.firstPass = true;
            this.skillMCCount = 0;
            for (let value of skillMCArray) {
                if (this.prevCandidateID == value.candidate_ID) {
                   
                    }
                else {
                    if (this.firstPass == true) {
                           
                        }
                    else {
                        skillMCArray2.push({"Candidate_ID": this.prevCandidateID, "Skill_Count": this.skillMCCount});
                        this.skillMCCount = 0;
                        }
                    }
                this.prevCandidateID = value.candidate_ID; 
                this.skillMCCount = this.skillMCCount + 1;
                this.firstPass = false;
                }
            skillMCArray2.push({"Candidate_ID": this.prevCandidateID, "Skill_Count": this.skillMCCount});
            this.skillMCs = skillMCArray2;
            this.getCandidates();
        }
      );
  }
  
  sort(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
  
  // Is this optional for the multi select control?
  onChange() {
        
  }
  
  private checkMatchCount(Candidate_ID) {
       var matchCount = 0;
       for (let value of this.skillMCs) {
           if (value.Candidate_ID == Candidate_ID) {
               matchCount = value.Skill_Count;
           }
       }
       return matchCount;
  }
  
} 