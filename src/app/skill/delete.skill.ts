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
import { Skill} from '../skill/skill';
import { NetCore2Service } from '../netcore2.service';
import { appRoutes } from '../routes';

@Component({
  selector: 'skill-del;',
  templateUrl: '../skill/delete.skill.html',
  styles: [
    `input.ng-touched.ng-invalid {
      border: 1px solid red;
    }`
  ]
})

export class DelSkill {
  public events: any[] = []; // use later to display form changes
  skill: Skill; //object for Skill model
  obsSkill: Skill; //object for observable usage
  skillID: string;  // store the selected skill ID
  spSkillID: string; // subscribe params for skill ID
  public submitted: boolean = false; //keep track of form submission
  errorMessage: string; //store the form error msg
  successMessage: string; //store the form success msg
  delResult: string;  // store the result of the delete skill API call 
  obsDelResult: string; // object for observable usage
  public skillName: string;
  private subscription: Subscription;
  param: string;
  
  constructor(private netcore2service : NetCore2Service, 
    private route: ActivatedRoute) {
  }
  
  ngOnInit() {
    this.skillID = "0";
    //Get skill details and bind to form for delete visual
    this.route.params.subscribe(params => {
      this.skillID = params['id'];
    });
    
    this.getSkillByID();
  }
  
  //Get the skill details for delete visual using
  //the NetCore2Service that we injected earlier
  private getSkillByID(): void {
    this.netcore2service
      .GetSkill(this.skillID)
      .subscribe(data => this.obsSkill = data,
        error => console.log(error),
        () => {
          //Parse the observable returned results and move
          //them to our class object referenced in our form group
          this.skill = this.obsSkill;
          var skillString = JSON.stringify(this.obsSkill);
          var skillParsed = JSON.parse(skillString);
          this.skillName = skillParsed.skill_Name;
        }
      );
  }
  
  delSkill() {
    this.submitted = true;
    //Call the skill delete via the NetCore2Service
    this.netcore2service
        .DelSkill(this.skillID)
        .subscribe(data => this.obsDelResult = data,
            error => console.log(error), () => {
            var delResultString = JSON.stringify(this.obsDelResult);
            var delResultParsed = JSON.parse(delResultString);
            this.delResult = delResultParsed.responseStatus;
            if (this.delResult === "200") {
                this.successMessage 
                = `Skill ${this.skillName} delete was successful`;
                }
            else {
                this.successMessage 
                = `Skill ${this.skillName} delete failed`;
                }
            }
        );
    
  }
  
}