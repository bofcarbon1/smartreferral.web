import {Component,  OnInit} from '@angular/core';
import { Http, 
  Response, 
  RequestOptions, 
  HttpModule, 
  Headers } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NetCore2Service } from '../netcore2.service';
import { SkillCategory } from '../skill/skill.category';
import { Skill } from '../skill/skill';
import { appRoutes } from '../routes';

@Component({
  selector: 'skill-home',
  templateUrl: './skill.home.html'
})

export class SkillHome implements OnInit {
  allskills:string;
  public obsSkills:string;
  selectedSkill: Skill;
  allskillcategories:string;
  public obsSkillCategories:string;
  selectedSkillCategory: SkillCategory;
  skillCategoryID: string;
  p: number = 1; //for table pagination
  
  constructor(public netcore2service : NetCore2Service) {
      
  }
  
  ngOnInit() {
    this.getSkills();
    this.getSkillCategories();
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
  
  private selectSkill(skill: Skill){
    this.selectedSkill = skill;
  }
  
  private getSkillsBySkillCategory(skillCategoryID): void {
    this.netcore2service
      .GetSkillsByCategory(skillCategoryID)
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
  
  private selectSkillCategory(skillcategory: SkillCategory){
    this.selectedSkillCategory = skillcategory;
  }
  
  //For some reason this is the only way to get a change 
  //listener with an action very weird
  private modifiedCategory (categoryvalue) {
    this.skillCategoryID = categoryvalue;
  }
  
  
} 