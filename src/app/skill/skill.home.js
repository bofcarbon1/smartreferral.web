"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SkillHome = (function () {
    function SkillHome(netcore2service) {
        this.netcore2service = netcore2service;
    }
    SkillHome.prototype.ngOnInit = function () {
        this.getSkills();
        this.getSkillCategories();
    };
    SkillHome.prototype.getSkills = function () {
        var _this = this;
        this.netcore2service
            .GetSkills()
            .subscribe(function (data) { return _this.obsSkills = data; }, function (error) { return console.log(error); }, function () {
            var skillString = JSON.stringify(_this.obsSkills);
            var skillParsed = JSON.parse(skillString);
            var skillArray = skillParsed.result;
            _this.allskills = skillArray;
        });
    };
    SkillHome.prototype.selectSkill = function (skill) {
        this.selectedSkill = skill;
    };
    SkillHome.prototype.getSkillsBySkillCategory = function (skillCategoryID) {
        var _this = this;
        this.netcore2service
            .GetSkillsByCategory(skillCategoryID)
            .subscribe(function (data) { return _this.obsSkills = data; }, function (error) { return console.log(error); }, function () {
            var skillString = JSON.stringify(_this.obsSkills);
            var skillParsed = JSON.parse(skillString);
            var skillArray = skillParsed.result;
            _this.allskills = skillArray;
        });
    };
    SkillHome.prototype.getSkillCategories = function () {
        var _this = this;
        this.netcore2service
            .GetSkillCategories()
            .subscribe(function (data) { return _this.obsSkillCategories = data; }, function (error) { return console.log(error); }, function () {
            var skillcategoryString = JSON.stringify(_this.obsSkillCategories);
            var skillcategoryParsed = JSON.parse(skillcategoryString);
            var skillcategoryArray = skillcategoryParsed.result;
            _this.allskillcategories = skillcategoryArray;
        });
    };
    SkillHome.prototype.selectSkillCategory = function (skillcategory) {
        this.selectedSkillCategory = skillcategory;
    };
    //For some reason this is the only way to get a change 
    //listener with an action very weird
    SkillHome.prototype.modifiedCategory = function (categoryvalue) {
        this.skillCategoryID = categoryvalue;
    };
    SkillHome = __decorate([
        core_1.Component({
            selector: 'skill-home',
            templateUrl: './skill.home.html'
        })
    ], SkillHome);
    return SkillHome;
}());
exports.SkillHome = SkillHome;
