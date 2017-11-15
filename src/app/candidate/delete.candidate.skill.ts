import {Host, 
  Component, 
  Directive, 
  OnInit, 
  OnDestroy,
  Pipe,
  PipeTransform
} from '@angular/core';
import { FormsModule, 
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Rx";
import { CandidateSkill} from '../candidate/candidate.skill';
import { NetCore2Service } from '../netcore2.service';
import { appRoutes } from '../routes';

@Component({
  selector: 'candidate-skill-del;',
  templateUrl: '../candidate/delete.candidate.skill.html',
  styles: [
    `input.ng-touched.ng-invalid {
      border: 1px solid red;
    }`
  ]
})

export class DelCandidateSkill {
  public events: any[] = []; // use later to display form changes
  candidateskill: CandidateSkill; //object for CandidateSkill model
  obsCandidateSkill: CandidateSkill; //object for observable usage
  candidateSkillID: string;  // store the selected candidate skill ID
  spCandidateSkillID: string; // subscribe params for candidate skill ID
  public submitted: boolean = false; //keep track of form submission
  errorMessage: string; //store the form error msg
  successMessage: string; //store the form success msg
  delResult: string;  // store the result of the delete candidate API call 
  obsDelResult: string; // object for observable usage
  public candidateSkillName: string;
  public candidateName: string; //store for state to return for more deletes
  public candidateID: string; //store for state to return for more deletes
  private subscription: Subscription;
  param: string;
  
  constructor(private netcore2service : NetCore2Service, 
    private route: ActivatedRoute) {
  }
  
  ngOnInit() {
    this.candidateSkillID = "0";
    //Get candidate skill details and bind to form for delete visual
    this.route.params.subscribe(params => {
      this.candidateSkillID = params['csid'];
      this.candidateID = params['cid'];
      this.candidateName = params['name'];
    });
    
    this.getCandidateSkillByID();
  }
  
  //Get the candidate skill details for delete visual using
  //the NetCore2Service that we injected earlier
  private getCandidateSkillByID(): void {
    this.netcore2service
      .GetCandidateSkill(this.candidateSkillID)
      .subscribe(data => this.obsCandidateSkill = data,
        error => console.log(error),
        () => {
          //Parse the observable returned results and move
          //them to our class object referenced in our form group
          this.candidateskill = this.obsCandidateSkill;
          var candidateSkillString = JSON.stringify(this.obsCandidateSkill);
          var candidateSkillParsed = JSON.parse(candidateSkillString);
          this.candidateSkillName = candidateSkillParsed.candidate_skill_name;
        }
      );
  }
  
  delCandidateSkill() {
    this.submitted = true;
    //Call the candidate skill delete via the NetCore2Service
    this.netcore2service
        .DelCandidateSkill(this.candidateSkillID)
        .subscribe(data => this.obsDelResult = data,
            error => console.log(error), () => {
            var delResultString = JSON.stringify(this.obsDelResult);
            var delResultParsed = JSON.parse(delResultString);
            this.delResult = delResultParsed.responseStatus;
            if (this.delResult === "200") {
                this.successMessage 
                = `Candidate skill ${this.candidateSkillName} delete was successful`;
                }
            else {
                this.successMessage 
                = `Candidate skill ${this.candidateSkillName} delete failed`;
                }
            }
        );
    }
  
}