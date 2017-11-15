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
import { SkillCategory } from '../skill/skill.category';
import { NetCore2Service } from '../netcore2.service';
import { appRoutes } from '../routes';

@Component({
  selector: 'skill-cat-upd',
  templateUrl: '../skill/update.skill.category.html',
  styles: [
    `input.ng-touched.ng-invalid {
      border: 1px solid red;
    }`
  ]
})

export class UpdSkillCategory {
  public events: any[] = []; // use later to display form changes
  public skillCategory: SkillCategory; //object for Skill Category model
  obsSkillCategory: SkillCategory;
  skillCategoryID: string; // store the selected skill category ID
  spSkillCategoryID: string; // subscribe params for skill category ID
  public submitted: boolean = false; //keep track of form submission
  updSkillCategoryForm: FormGroup; // skill category form group
  errorMessage: string; //store the form error msg
  successMessage: string; //store the form success msg
  addResult: string;  // store the result of the add API call 
  updResult: string; //store the result of the upd API call
  obsAddResult: string; // object for observable usage
  obsUpdResult: string; // object for observable usage
  public skillCategoryName: string;
  private subscription: Subscription;
  allskillcategories:string;
  public obsSkillCategories:string;
  param: string;
  categories: string[] = [
    'web',
    'database',
    'service'
  ];
  
  constructor(private netcore2service : NetCore2Service, 
    private fb: FormBuilder,
    private route: ActivatedRoute
    ) {
    this.updSkillCategoryForm = this.fb.group({
      'name': ['', Validators.required]
    });
  }
  
  ngOnInit() {
    this.skillCategoryID = "0";
    //Get skill category details and bind to form for update
    this.route.params.subscribe(params => {
      this.skillCategoryID = params['id'];
    });
    
    //Test for new or modify skill
    if (parseInt(this.skillCategoryID) > 0) {
      this.getSkillCategoryByID();
    }
    else {
      //Set skill category details and bind to form for add
      this.updSkillCategoryForm = this.fb.group({
        'name': ['', Validators.required]
      });
    }
  }

  ngOnDestroy(){
     
  }
  
  //Get the skill category name of the preselected category
  //in the select list or the category for update via service NetCore2Service
  private getSkillCategoryByID(): void {
    console.log("this.skillCategoryID", this.skillCategoryID);
    this.netcore2service
      .GetSkillCategory(this.skillCategoryID)
      .subscribe(data => this.obsSkillCategory = data,
        error => console.log(error),
        () => {
          //Parse the observable returned results and bind them
          //them to class objects including the category form group
          this.skillCategory = this.obsSkillCategory;
          var skillCategoryString = JSON.stringify(this.obsSkillCategory);
          var skillCategoryParsed = JSON.parse(skillCategoryString);
          this.skillCategoryName = skillCategoryParsed.skill_Category_Name;
          this.updSkillCategoryForm = this.fb.group({
            'name': [this.skillCategoryName, Validators.required]
            });
          }
      );
  }
  
  private updSkillCategory() {
    let model;
    this.submitted = true;
    model = this.updSkillCategoryForm.value;
    model.skill_category_name = this.skillCategoryName;
    let scat = new SkillCategory();
    Object.assign(scat, model);
    //We use our service for data requests not the collection
    //If we have have a value in a candidate id then we call 
    //our update candidate otherwise we call our add candidate 
    if (parseInt(this.skillCategoryID) > 0) {
      //Call the skill category update via the NetCore2Service
      this.netcore2service
        .UpdSkillCategory(this.skillCategoryID, scat)
        .subscribe(data => this.obsUpdResult = data,
          error => console.log(error),
          () => {
            var updResultString = JSON.stringify(this.obsUpdResult);
            var updResultParsed = JSON.parse(updResultString);
            this.updResult = updResultParsed.responseStatus;
            if (this.updResult === "200") {
                this.successMessage 
                = `Skill category ${this.skillCategoryName} update was successful`;
                }
            else {
                this.successMessage 
                = `Skill category ${this.skillCategoryName} update failed`;
                }
          }
        );
    }
    else {
      //Call the add skill category service  
      this.netcore2service
        .AddSkillCategory(scat)
        .subscribe(data => this.obsAddResult = data,
          error => console.log(error),
          () => {
            var addResultString = JSON.stringify(this.obsAddResult);
            var addResultParsed = JSON.parse(addResultString);
            this.addResult = addResultParsed.responseStatus;
            if (this.addResult === "201") {
                this.successMessage 
                = `Skill category ${this.skillCategoryName} add was successful`;
                }
            else {
                this.successMessage 
                = `Skill category ${this.skillCategoryName} add failed`;
                }
          }
        );
      
    }
    
  }
  
  //Workaround to be removed with up to date form
  private modifiedName (namevalue) {
    this.skillCategoryName = namevalue;
  }
  

}
