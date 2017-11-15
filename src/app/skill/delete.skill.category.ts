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
import { SkillCategory} from '../skill/skill.category';
import { NetCore2Service } from '../netcore2.service';
import { appRoutes } from '../routes';

@Component({
  selector: 'skill-cat-del;',
  templateUrl: '../skill/delete.skill.category.html',
  styles: [
    `input.ng-touched.ng-invalid {
      border: 1px solid red;
    }`
  ]
})

export class DelSkillCategory {
  public events: any[] = []; // use later to display form changes
  skillCategory: SkillCategory; //object for Skill category model
  obsSkillCategory: SkillCategory; //object for observable usage
  skillCategoryID: string;  // store the selected skill category ID
  spSkillCategoryID: string; // subscribe params for skill category ID
  public submitted: boolean = false; //keep track of form submission
  errorMessage: string; //store the form error msg
  successMessage: string; //store the form success msg
  delResult: string;  // store the result of the delete skill API call 
  obsDelResult: string; // object for observable usage
  public skillCategoryName: string;
  private subscription: Subscription;
  param: string;
  
  constructor(private netcore2service : NetCore2Service, 
    private route: ActivatedRoute) {
  }
  
  ngOnInit() {
    this.skillCategoryID = "0";
    //Get skill category details and bind to form for delete visual
    this.route.params.subscribe(params => {
      this.skillCategoryID = params['id'];
    });
    
    this.getSkillCategoryByID();
  }
  
  //Get the skill category details for delete visual using
  //the NetCore2Service that we injected earlier
  private getSkillCategoryByID(): void {
    this.netcore2service
      .GetSkillCategory(this.skillCategoryID)
      .subscribe(data => this.obsSkillCategory = data,
        error => console.log(error),
        () => {
          //Parse the observable returned results and move
          //them to our class object referenced in our form group
          this.skillCategory = this.obsSkillCategory;
          var skillCategoryString = JSON.stringify(this.obsSkillCategory);
          var skillCategoryParsed = JSON.parse(skillCategoryString);
          this.skillCategoryName = skillCategoryParsed.skill_Category_Name;
        }
      );
  }
  
  delSkillCategory() {
    this.submitted = true;
    //Call the skill category delete via the NetCore2Service
    this.netcore2service
        .DelSkillCategory(this.skillCategoryID)
        .subscribe(data => this.obsDelResult = data,
            error => console.log(error), () => {
            var delResultString = JSON.stringify(this.obsDelResult);
            var delResultParsed = JSON.parse(delResultString);
            this.delResult = delResultParsed.responseStatus;
            if (this.delResult === "200") {
                this.successMessage 
                = `Skill category ${this.skillCategoryName} delete was successful`;
                }
            else {
                this.successMessage 
                = `Skill category ${this.skillCategoryName} delete failed`;
                }
            }
        );
    
  }
  
}