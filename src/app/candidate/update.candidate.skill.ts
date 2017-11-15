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
import { NumberValidatorsService } from "../services/validation/number.validator.service";


@Component({
  selector: 'candidate-skill-upd',
  templateUrl: '../candidate/update.candidate.skill.html',
  styles: [
    `input.ng-touched.ng-invalid {
      border: 1px solid red;
    }`
  ]
})

export class UpdCandidateSkill {
  public events: any[] = []; // use later to display form changes
  candidateskill: CandidateSkill; //object for Candidate Skill model
  obsCandidateSkill: CandidateSkill; //object for observable usage
  candidateSkillID: string;  // store the selected candidate skill ID from params
  candidateName: string; // store the selected candidate from params
  candidateSkillName: string; // store the selected candidate from params
  spCandidateSkillID: string; // subscribe params for candidate skill ID
  public submitted: boolean = false; //keep track of form submission
  updCSForm: FormGroup; // candidate skill form group 
  errorMessage: string; //store the form error msg
  successMessage: string; //store the form success msg
  addResult: string;  // store the result of the add candidate API call 
  updResult: string; //store the result of the upd candidate API call
  obsAddResult: string; // object for observable usage
  obsUpdResult: string; // object for observable usage
  public level: number;
  public yearsUsed: number;
  public lastUsed: number;
  private subscription: Subscription;
  param: string;
  
  constructor(private netcore2service : NetCore2Service, 
    private fbcs: FormBuilder, 
    private route: ActivatedRoute,
    private numbervalidatorservice : NumberValidatorsService
    ) {
    this.updCSForm = this.fbcs.group({
      'level': ['', 
      [Validators.required, 
      NumberValidatorsService.max(5), 
      NumberValidatorsService.min(0)] ],
      'years': ['', 
      [Validators.required, 
      NumberValidatorsService.max(20), 
      NumberValidatorsService.min(1)] ],
      'last': ['',
      [Validators.required, 
      NumberValidatorsService.max(2019), 
      NumberValidatorsService.min(1999)] ]
    });
  }
  
  ngOnInit() {
    this.candidateSkillID = "0";
    //Get candiate skill details and bind to form for update
    this.route.params.subscribe(params => {
      this.candidateSkillID = params['id'];
      this.candidateName = params['name'];
      this.candidateSkillName = params['skillname'];
    });

    //Test for new candidate skill or modify 
    if (parseInt(this.candidateSkillID) > 0) {
      this.getCandidateSkillByID();
    }
    else {
      //Set candidate skill details and bind to form for add
      this.updCSForm = this.fbcs.group({
        'level': ['', 
        [Validators.required, 
        NumberValidatorsService.max(5), 
        NumberValidatorsService.min(0)] ],
        'years': ['', 
        [Validators.required, 
        NumberValidatorsService.max(20), 
        NumberValidatorsService.min(1)] ],
        'last': ['', 
        [Validators.required, 
        NumberValidatorsService.max(2019), 
        NumberValidatorsService.min(1999)] ]
      });
    }
  }

  ngOnDestroy(){
     
  }
  
  //Get the candidate skills details for update using
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
          this.level = candidateSkillParsed.level;
          this.lastUsed = candidateSkillParsed.last_Year_Used;
          this.yearsUsed = candidateSkillParsed.years_Used;
          this.updCSForm = this.fbcs.group({
            'level': [this.level, 
            [Validators.required, 
            NumberValidatorsService.max(5), 
            NumberValidatorsService.min(0)] ],
            'last': [this.lastUsed, 
            [Validators.required, 
            NumberValidatorsService.max(2019), 
            NumberValidatorsService.min(1999)] ],
            'years': [this.yearsUsed, 
            [Validators.required, 
            NumberValidatorsService.max(20), 
            NumberValidatorsService.min(1)] ]
            });
          }
      );
  }
  
  updCandidateSkill() {
    let model;
    this.submitted = true;
    model = this.updCSForm.value;
    model.level = this.level;
    model.last_Year_Used = this.lastUsed;
    model.years_Used = this.yearsUsed;
    let candskill = new CandidateSkill();
    Object.assign(candskill, model);
    //We use our service for data requests not the collection
    //If we have have a value in a candidate skill id then we call 
    //our update candidate skill otherwise we call our add  
    if (parseInt(this.candidateSkillID) > 0) {
      //Call the candidate skill update via the NetCore2Service
      this.netcore2service
        .UpdCandidateSkill(this.candidateSkillID, candskill)
        .subscribe(data => this.obsUpdResult = data,
          error => console.log(error),
          () => {
            var updResultString = JSON.stringify(this.obsUpdResult);
            var updResultParsed = JSON.parse(updResultString);
            this.updResult = updResultParsed.responseStatus;
            if (this.updResult === "200") {
                this.successMessage 
                = `Candidate skill update was successful`;
                }
            else {
                this.successMessage 
                = `Candidate skill update failed`;
                }
          }
        );
    }
    
  }
  
  //Workaround to be removed with up to date form
  modifiedLevel (levelvalue) {
    this.level = levelvalue;
  }
  
  //Workaround to be removed with up to date form
  modifiedLastUsed (lastusedvalue) {
    this.lastUsed = lastusedvalue;
  }
  
  //Workaround to be removed with up to date form
  modifiedYearsUsed (yearsusedvalue) {
    this.yearsUsed = yearsusedvalue;
  }
  

}
