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
import { Skill} from '../skill/skill';
import { NetCore2Service } from '../netcore2.service';
import { appRoutes } from '../routes';

@Component({
  selector: 'skill-upd',
  templateUrl: '../skill/update.skill.html',
  styles: [
    `input.ng-touched.ng-invalid {
      border: 1px solid red;
    }`
  ]
})

export class UpdSkill {
  public events: any[] = []; // use later to display form changes
  skill: Skill; //object for Skill model
  public skillCategory: SkillCategory; //object for Skill Category model
  obsSkill: Skill; //object for observable usage
  obsSkillCategory: SkillCategory;
  skillID: string;  // store the selected skill ID
  skillCategoryID: string; // store the selected skill category ID
  spSkillID: string; // subscribe params for skill ID
  public submitted: boolean = false; //keep track of form submission
  updSkillForm: FormGroup; // skill form group 
  errorMessage: string; //store the form error msg
  successMessage: string; //store the form success msg
  addResult: string;  // store the result of the add API call 
  updResult: string; //store the result of the upd API call
  obsAddResult: string; // object for observable usage
  obsUpdResult: string; // object for observable usage
  public skillName: string;
  private subscription: Subscription;
  public categoryPreselectValue: string;
  public categoryPreselectText: string;
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
    this.updSkillForm = this.fb.group({
      'name': ['', Validators.required],
      'category': ['web']
    });
  }
  
  ngOnInit() {
    this.skillID = "0";
    //Get skill details and bind to form for update
    this.route.params.subscribe(params => {
      this.skillID = params['id'];
    });
    
    //Get the skill categories for selection
     this.getSkillCategories();

    //Test for new or modify skill
    if (parseInt(this.skillID) > 0) {
      this.getSkillByID();
    }
    else {
      //Set skill details and bind to form for add
      this.updSkillForm = this.fb.group({
        'name': ['', Validators.required],
        'category': ['web']
      });
    }
  }

  ngOnDestroy(){
     
  }
  
  //Get the skill details for update using
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
          this.categoryPreselectValue = skillParsed.skill_Category_ID;
          this.skillCategoryID = this.categoryPreselectValue;
          this.getSkillCategoryByID();
          this.updSkillForm = this.fb.group({
            'name': [this.skillName, Validators.required]
            });
          }
      );
  }
  
  private getSkillCategories(): void {
    this.netcore2service
      .GetSkillCategories()
      .subscribe(data => this.obsSkillCategories = data,
        error => console.log(error),
        () => {
          var skillcategoryString = JSON.stringify(this.obsSkillCategories);
          var skillcategoryParsed = JSON.parse(skillcategoryString);
          var skillcategoryArray = skillcategoryParsed.result;
          this.allskillcategories = skillcategoryArray;
          }
      );
  }
  
  //Get the skill category name of the preselected category
  //in the select list or the category for update via service NetCore2Service
  private getSkillCategoryByID(): void {
    this.netcore2service
      .GetSkillCategory(this.skillCategoryID)
      .subscribe(data => this.obsSkillCategory = data,
        error => console.log(error),
        () => {
          //Parse the observable returned results and bind them
          //them to class objects using skill category 
          this.skillCategory = this.obsSkillCategory;
          var skillCategoryString = JSON.stringify(this.obsSkillCategory);
          var skillCategoryParsed = JSON.parse(skillCategoryString);
          this.categoryPreselectText = skillCategoryParsed.skill_Category_Name;
          }
      );
  }
  
  private updSkill() {
    let model;
    this.submitted = true;
    model = this.updSkillForm.value;
    model.skill_name = this.skillName;
    model.skill_Category_ID = this.skillCategoryID;
    let skil = new Skill();
    Object.assign(skil, model);
    //We use our service for data requests not the collection
    //If we have have a value in a candidate id then we call 
    //our update candidate otherwise we call our add candidate 
    if (parseInt(this.skillID) > 0) {
      //Call the skill update via the NetCore2Service
      this.netcore2service
        .UpdSkill(this.skillID, skil)
        .subscribe(data => this.obsUpdResult = data,
          error => console.log(error),
          () => {
            var updResultString = JSON.stringify(this.obsUpdResult);
            var updResultParsed = JSON.parse(updResultString);
            this.updResult = updResultParsed.responseStatus;
            if (this.updResult === "200") {
                this.successMessage 
                = `Skill ${this.skillName} update was successful`;
                }
            else {
                this.successMessage 
                = `Skill ${this.skillName} update failed`;
                }
          }
        );
    }
    else {
      //Call the add skill service 
      this.netcore2service
        .AddSkill(skil)
        .subscribe(data => this.obsAddResult = data,
          error => console.log(error),
          () => {
            var addResultString = JSON.stringify(this.obsAddResult);
            var addResultParsed = JSON.parse(addResultString);
            this.addResult = addResultParsed.responseStatus;
            if (this.addResult === "201") {
                this.successMessage 
                = `Skill ${this.skillName} add was successful`;
                }
            else {
                this.successMessage 
                = `Skill ${this.skillName} add failed`;
                }
          }
        );
      
    }
    
  }
  
  //Workaround to be removed with up to date form
  private modifiedName (namevalue) {
    this.skillName = namevalue;
  }
  
  //Workaround to be removed with up to date form
  private modifiedCategory (categoryvalue) {
    this.skillCategoryID = categoryvalue;
  }
  
 
}
