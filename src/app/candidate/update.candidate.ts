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
import { Candidate} from '../candidate/candidate';
import { NetCore2Service } from '../netcore2.service';
import { appRoutes } from '../routes';
import { NumberValidatorsService } from "../services/validation/number.validator.service";
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'candidate-upd',
  templateUrl: '../candidate/update.candidate.html',
  styles: [
    `input.ng-touched.ng-invalid {
      border: 1px solid red;
    }
    `
  ]
})

export class UpdCandidate {
  public events: any[] = []; // use later to display form changes
  candidate: Candidate; //object for Candidate model
  obsCandidate: Candidate; //object for observable usage
  candidateID: string;  // store the selected candidate ID
  spCandidateID: string; // subscribe params for candidate ID
  public submitted: boolean = false; //keep track of form submission
  updCandidateForm: FormGroup; // candidate form group 
  errorMessage: string; //store the form error msg
  successMessage: string; //store the form success msg
  addResult: string;  // store the result of the add candidate API call 
  updResult: string; //store the result of the upd candidate API call
  obsAddResult: string; // object for observable usage
  obsUpdResult: string; // object for observable usage
  public candidateName: string;
  public candidatePhone: string;
  public candidateeMail: string;
  public candidateNote: string;
  public candidateSkillLevel: number; 
  public candidateScreenLevel: number; 
  public candidateCodeSampleLevel: number; 
  public candidateVideoLevel: number; 
  private subscription: Subscription;
  param: string;
  
  constructor(private netcore2service : NetCore2Service, 
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private numbervalidatorservice : NumberValidatorsService
    ) {
    this.updCandidateForm = this.fb.group({
      'name': ['', Validators.required],
      'phone': ['', Validators.required],
      'email': ['', Validators.email],
      'note': ['', Validators.required],
      'skilllevel': ['0', 
        [Validators.required, 
        NumberValidatorsService.max(5), 
        NumberValidatorsService.min(0)] ],
      'screenlevel': ['0',  
        [Validators.required, 
        NumberValidatorsService.max(5), 
        NumberValidatorsService.min(0)] ],
      'codesamplelevel': ['0', 
        [Validators.required, 
        NumberValidatorsService.max(5), 
        NumberValidatorsService.min(0)] ],
      'videolevel': ['0',  
        [Validators.required, 
        NumberValidatorsService.max(5), 
        NumberValidatorsService.min(0)] ]
    });
  }
  
  ngOnInit() {
    this.candidateID = "0";
    //Get candiate details and bind to form for update
    this.route.params.subscribe(params => {
      this.candidateID = params['id'];
    });

    //Test for new candidate or modify candidate
    if (parseInt(this.candidateID) > 0) {
      this.getCandidateByID();
    }
    else {
      //Set candidate details and bind to form for add
      this.updCandidateForm = this.fb.group({
        'name': ['', Validators.required],
        'phone': ['', Validators.required],
        'email': ['', Validators.email],
        'note': ['', Validators.required],
       'skilllevel': ['0', 
        [Validators.required, 
        NumberValidatorsService.max(5), 
        NumberValidatorsService.min(0)] ],
        'screenlevel': ['0',  
        [Validators.required, 
        NumberValidatorsService.max(5), 
        NumberValidatorsService.min(0)] ],
        'codesamplelevel': ['0',  
        [Validators.required, 
        NumberValidatorsService.max(5), 
        NumberValidatorsService.min(0)] ],
        'videolevel': ['0', 
        [Validators.required, 
        NumberValidatorsService.max(5), 
        NumberValidatorsService.min(0)] ]
      });
    }
  }

  ngOnDestroy(){
     
  }
  
  //Get the candidate details for update using
  //the NetCore2Service that we injected earlier
  private getCandidateByID(): void {
    this.netcore2service
      .GetCandidate(this.candidateID)
      .subscribe(data => this.obsCandidate = data,
        error => console.log(error),
        () => {
          //Parse the observable returned results and move
          //them to our class object referenced in our form group
          this.candidate = this.obsCandidate;
          var candidateString = JSON.stringify(this.obsCandidate);
          var candidateParsed = JSON.parse(candidateString);
          this.candidateName = candidateParsed.candidate_name;
          this.candidatePhone = candidateParsed.candidate_phone;
          this.candidateeMail = candidateParsed.candidate_email;
          this.candidateNote = candidateParsed.candidate_note;
          this.candidateSkillLevel = candidateParsed.candidate_skill_level;
          this.candidateCodeSampleLevel = candidateParsed.candidate_code_sample_level;
          this.candidateScreenLevel = candidateParsed.candidate_screen_level;
          this.candidateVideoLevel = candidateParsed.candidate_video_level;
          this.updCandidateForm = this.fb.group({
            'name': [this.candidateName, Validators.required],
            'phone': [this.candidatePhone, Validators.required],
            'email': [this.candidateeMail, Validators.email],
            'note': [this.candidateNote, Validators.required],
            'skilllevel': [this.candidateSkillLevel, 
              [Validators.required, 
              NumberValidatorsService.max(5), 
              NumberValidatorsService.min(0)] ],
            'screenlevel': [this.candidateScreenLevel, 
              [Validators.required, 
              NumberValidatorsService.max(5), 
              NumberValidatorsService.min(0)] ],
            'codesamplelevel': [this.candidateCodeSampleLevel, 
              [Validators.required, 
              NumberValidatorsService.max(5), 
              NumberValidatorsService.min(0)] ],
            'videolevel': [this.candidateVideoLevel, 
              [Validators.required, 
              NumberValidatorsService.max(5), 
              NumberValidatorsService.min(0)] ]
            });
          }
      );
  }
  
  updCandidate() {
    let model;
    this.submitted = true;
    model = this.updCandidateForm.value;
    model.candidate_name = this.candidateName;
    model.candidate_phone = this.candidatePhone;
    model.candidate_email = this.candidateeMail;
    model.candidate_note = this.candidateNote;
    model.candidate_skill_level = this.candidateSkillLevel;
    model.candidate_screen_level = this.candidateScreenLevel;
    model.candidate_code_sample_level = this.candidateCodeSampleLevel;
    model.candidate_video_level = this.candidateVideoLevel;
    let cand = new Candidate();
    Object.assign(cand, model);
    //We use our service for data requests not the collection
    //If we have have a value in a candidate id then we call 
    //our update candidate otherwise we call our add candidate 
    if (parseInt(this.candidateID) > 0) {
      //Call the candidate update via the NetCore2Service
      this.netcore2service
        .UpdCandidate(this.candidateID, cand)
        .subscribe(data => this.obsUpdResult = data,
          error => console.log(error),
          () => {
            var updResultString = JSON.stringify(this.obsUpdResult);
            var updResultParsed = JSON.parse(updResultString);
            this.updResult = updResultParsed.responseStatus;
            if (this.updResult === "200") {
                this.successMessage 
                = `Candidate ${this.candidateName} update was successful`;
                }
            else {
                this.successMessage 
                = `Candidate ${this.candidateName} update failed`;
                }
          }
        );
    }
    else {
      //Call the add candidate service 
      this.netcore2service
        .AddCandidate(cand)
        .subscribe(data => this.obsAddResult = data,
          error => console.log(error),
          () => {
            //this.addResult = this.obsAddResult;
            var addResultString = JSON.stringify(this.obsAddResult);
            var addResultParsed = JSON.parse(addResultString);
            this.addResult = addResultParsed.responseStatus;
            if (this.addResult === "201") {
                this.successMessage 
                = `Candidate ${this.candidateName} add was successful`;
                }
            else {
                this.successMessage 
                = `Candidate ${this.candidateName} add failed`;
                }
          }
        );
      
    }
    
  }
  
  //Workaround to be removed with up to date form
  modifiedName (namevalue) {
    this.candidateName = namevalue;
  }
  
  //Workaround to be removed with up to date form
  modifiedPhone (phonevalue) {
    this.candidatePhone = phonevalue;
  }
  
  //Workaround to be removed with up to date form
  modifiedeMail (emailvalue) {
    this.candidateeMail = emailvalue;
  }
  
  //Workaround to be removed with up to date form
  modifiedNote (notevalue) {
    this.candidateNote = notevalue;
  }
  
  //Store the skill level value from form
  modifiedSkillLevel (skilllevelvalue) {
    this.candidateSkillLevel = skilllevelvalue;
  }
  
  //Store the screen level value from form
  modifiedScreenLevel (screenlevelvalue) {
    this.candidateScreenLevel = screenlevelvalue;
  }
  
  //Store the code sample level value from form
  modifiedCodeSampleLevel (codesamplelevelvalue) {
    this.candidateCodeSampleLevel = codesamplelevelvalue;
  }
  
  //Store the video level value from form
  modifiedVideoLevel (videolevelvalue) {
    this.candidateVideoLevel = videolevelvalue;
  }


}
