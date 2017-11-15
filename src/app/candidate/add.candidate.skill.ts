import {Host, 
  Component, 
  Directive, 
  OnInit, 
  OnDestroy,
  Pipe,
  PipeTransform,
  Input
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
import { IMultiSelectOption, 
  IMultiSelectTexts, 
  IMultiSelectSettings} from 'angular-2-dropdown-multiselect';
import { CandidateSkill} from '../candidate/candidate.skill';
import { Skill } from '../skill/skill';
import { NetCore2Service } from '../netcore2.service';
import { DataShareService } from '../data.share.service';
import { appRoutes } from '../routes';

@Component({
  selector: 'candidate-skill-add',
  templateUrl: '../candidate/add.candidate.skill.html',
  styles: [
    `input.ng-touched.ng-invalid {
      border: 1px solid red;
    }`
  ]
})

export class AddCandidateSkill {
  public events: any[] = []; // use later to display form changes
  availableskills: IMultiSelectOption[]; // used for multiselect add skills
  skillstoadd: string; // store skills to add in json string array
  candidateskills: CandidateSkill[]; //object for Candidate Skill model
  obsAvailableSkills: Skill; //object for observable usage
  candidateID: string;  // store the candidate ID from passed parms
  candidateName: string; // store the candidate name from passed parms
  currCandidateSkills : string //store the candidate skill from data share service
  spCandidateID: string; // subscribe params for candidate ID
  public submitted: boolean = false; //keep track of form submission
  addCandidateSkillForm: FormGroup; // candidate skill add form group 
  errorMessage: string; //store the form error msg
  successMessage: string; //store the form success msg
  addResult: string;  // store the result of the add candidate API call 
  obsAddResult: string; // object for observable usage
  public skill: string;
  private subscription: Subscription;
  param: string;
  public optionsModel: number[]; //used to store selected skills 
  myTexts: IMultiSelectTexts;
  mySettings: IMultiSelectSettings;
  constructor(private netcore2service : NetCore2Service, 
    public datashareservice : DataShareService,
    private route: ActivatedRoute
    ) {
  }
  
  ngOnInit() {
    this.candidateID = "0";
    //Get candiate skills available to bind to form for add
    this.route.params.subscribe(params => {
      this.candidateID = params['id'];
      this.candidateName = params['name'];
    });
    
    //Get the candidate current skills for display
    this.currCandidateSkills = this.datashareservice.getCurrCandidateSkills();
    
    //Validate that there is a valid candidate ID to add skills for 
    if (parseInt(this.candidateID) > 0) {
      this.getSkillsAvailableForCandidate();
    }
    else {
      //Return error message here and log it.
      console.log("add.candidate.skill.ts: ngOnInit: invalid canddidateID", 
      this.candidateID);
    }
    
    // Text configuration
    this.myTexts = {
      checkAll: 'Select all',
      uncheckAll: 'Unselect all',
      checked: 'item selected',
      checkedPlural: 'items selected',
      defaultTitle: 'Select',
      allSelected: 'All selected',
    };
    
    // Settings configuration
    this.mySettings = {
      checkedStyle: 'fontawesome',
      buttonClasses: 'btn btn-default btn-block',
      dynamicTitleMaxItems: 3,
      displayAllSelectedText: true
    };

  }

  ngOnDestroy(){
     
  }
  
  //Get the candidate skills details for add using
  //the NetCore2Service that we injected earlier
  private getSkillsAvailableForCandidate(): void {
    this.netcore2service
      .GetSkillsAvailableForCandidate(this.candidateID)
      .subscribe(data => this.obsAvailableSkills = data,
        error => console.log(error),
        () => {
          //Parse the observable returned results and move
          //them to our class object referenced in our form group
          var skillString = JSON.stringify(this.obsAvailableSkills);
          var skillParsed = JSON.parse(skillString);
          var skillArray = skillParsed.result;
          this.availableskills = skillArray;
          }
      );
  }
  
  addCandidateSkills() {
    this.submitted = true;
    if (parseInt(this.candidateID) > 0) {
        //Call the add candidate skill service method 
        this.netcore2service
        .AddCandidateSkills(this.candidateID, this.optionsModel)
        .subscribe(data => this.obsAddResult = data,
            error => console.log(error),
            () => {
                var addResultString = JSON.stringify(this.obsAddResult);
                var addResultParsed = JSON.parse(addResultString);
                this.addResult = addResultParsed.responseStatus;
                if (this.addResult === "0") {
                    this.successMessage = "Candidate skill add request was successful";
                    }
                else {
                    this.successMessage = "Candidate skill add request failed";
                    }
                }
            );
        }
    else {
        //We are missing a candidate ID log error message
        console.log("add.candidate.skill.ts: addCandidateSkill: invalid canddidateID"
        , this.candidateID);
        this.successMessage = "Invalid candidate skill add request was not successful";
        }
    
    }
  
    //Workaround to be removed with up to date form
    onChange() {
        //console.log("onChange: this.optionsModel: ", this.optionsModel);
    }
  

}
