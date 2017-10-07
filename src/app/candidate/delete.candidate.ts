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

@Component({
  selector: 'candidate-del;',
  templateUrl: '../candidate/delete.candidate.html',
  styles: [
    `input.ng-touched.ng-invalid {
      border: 1px solid red;
    }`
  ]
})

export class DelCandidate {
  public events: any[] = []; // use later to display form changes
  candidate: Candidate; //object for Candidate model
  obsCandidate: Candidate; //object for observable usage
  candidateID: string;  // store the selected candidate ID
  spCandidateID: string; // subscribe params for candidate ID
  public submitted: boolean = false; //keep track of form submission
  errorMessage: string; //store the form error msg
  successMessage: string; //store the form success msg
  delResult: string;  // store the result of the delete candidate API call 
  obsDelResult: string; // object for observable usage
  public candidateName: string;
  private subscription: Subscription;
  param: string;
  
  constructor(private netcore2service : NetCore2Service, 
    private route: ActivatedRoute) {
  }
  
  ngOnInit() {
    this.candidateID = "0";
    //Get candiate details and bind to form for delete visual
    this.route.params.subscribe(params => {
      this.candidateID = params['id'];
    });
    
    this.getCandidateByID();
  }
  
  //Get the candidate details for delete visual using
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
        }
      );
  }
  
  delCandidate() {
    this.submitted = true;
    //Call the candidate update via the NetCore2Service
    this.netcore2service
        .DelCandidate(this.candidateID)
        .subscribe(data => this.obsDelResult = data,
            error => console.log(error), () => {
            var delResultString = JSON.stringify(this.obsDelResult);
            var delResultParsed = JSON.parse(delResultString);
            this.delResult = delResultParsed.responseStatus;
            if (this.delResult === "200") {
                this.successMessage 
                = `Candidate ${this.candidateName} delete was successful`;
                }
            else {
                this.successMessage 
                = `Candidate ${this.candidateName} delete failed`;
                }
            }
        );
    //This code must be moved to a seperate function where
    //messages are set to positive or negative after the result
    //is obtained or an error occurs attemtping to retrieve the
    //result. This will take care of the problem of a slow service
    //response. 
    //this.successMessage 
    //    = `Candidate ${this.candidateName} delete was successful`;
    
  }
  
}