import {Component,  
  OnInit
} from '@angular/core';
import { Http, 
  Response, 
  RequestOptions, 
  HttpModule, 
  Headers } from '@angular/http';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { NetCore2Service } from '../netcore2.service';
import { DataShareService } from '../data.share.service';
import { CandidateSkill } from '../candidate/candidate.skill';
import { appRoutes } from '../routes';

@Component({
  selector: 'candidateSkillHome',
  templateUrl: './candidate.skill.home.html',
  styles: [
    `
    p {
       font-size: .80em;
    }
    
    table {
      border: 1px solid black;
      font-size: .80em;
    }
       
   ` 
    ]
})

export class CandidateSkillHome implements OnInit {
  public allskills:string;
  public allcandidateskills:string;
  public obsSkills:string;
  public obsCandidateSkills:string;
  selectedCandidateSkill: CandidateSkill;
  candidateID: string;
  candidateName: string;
  
  constructor(public netcore2service : NetCore2Service,
    public datashareservice : DataShareService,
    private route: ActivatedRoute) {
      
  }
  
  ngOnInit() {
    this.candidateID = "0";
    //Get candiate details and bind to form for delete visual
    this.route.params.subscribe(params => {
      this.candidateID = params['id'];
      this.candidateName = params['name'];
    });
    //load initial data
    this.getSkills();
    this.getCandidateSkills();
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
          this.allskills = skillArray;
        }
      );
  }
  
  private getCandidateSkills(): void {
    this.netcore2service
      .GetCandidateSkills("Candidate", this.candidateID)
      .subscribe(data => this.obsCandidateSkills = data,
        error => console.log(error),
        () => {
          var candidateSkillString = JSON.stringify(this.obsCandidateSkills);
          var candidateSkillParsed = JSON.parse(candidateSkillString);
          var candidateSkillArray = candidateSkillParsed.result;
          this.allcandidateskills = candidateSkillArray;
          this.datashareservice.setCurrCandidateSkills(this.allcandidateskills);
          }
      );
  }
  
  selectCandidateSkill(candidateSkill: CandidateSkill){
    this.selectedCandidateSkill = candidateSkill;
  }
  

} 
