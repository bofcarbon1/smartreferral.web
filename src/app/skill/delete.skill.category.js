"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var DelSkillCategory = (function () {
    function DelSkillCategory(netcore2service, route) {
        this.netcore2service = netcore2service;
        this.route = route;
        this.events = []; // use later to display form changes
        this.submitted = false; //keep track of form submission
    }
    DelSkillCategory.prototype.ngOnInit = function () {
        var _this = this;
        this.skillCategoryID = "0";
        //Get skill category details and bind to form for delete visual
        this.route.params.subscribe(function (params) {
            _this.skillCategoryID = params['id'];
        });
        this.getSkillCategoryByID();
    };
    //Get the skill category details for delete visual using
    //the NetCore2Service that we injected earlier
    DelSkillCategory.prototype.getSkillCategoryByID = function () {
        var _this = this;
        this.netcore2service
            .GetSkillCategory(this.skillCategoryID)
            .subscribe(function (data) { return _this.obsSkillCategory = data; }, function (error) { return console.log(error); }, function () {
            //Parse the observable returned results and move
            //them to our class object referenced in our form group
            _this.skillCategory = _this.obsSkillCategory;
            var skillCategoryString = JSON.stringify(_this.obsSkillCategory);
            var skillCategoryParsed = JSON.parse(skillCategoryString);
            _this.skillCategoryName = skillCategoryParsed.skill_Category_Name;
        });
    };
    DelSkillCategory.prototype.delSkillCategory = function () {
        var _this = this;
        this.submitted = true;
        //Call the skill category delete via the NetCore2Service
        this.netcore2service
            .DelSkillCategory(this.skillCategoryID)
            .subscribe(function (data) { return _this.obsDelResult = data; }, function (error) { return console.log(error); }, function () {
            var delResultString = JSON.stringify(_this.obsDelResult);
            var delResultParsed = JSON.parse(delResultString);
            _this.delResult = delResultParsed.responseStatus;
            if (_this.delResult === "200") {
                _this.successMessage
                    = "Skill category " + _this.skillCategoryName + " delete was successful";
            }
            else {
                _this.successMessage
                    = "Skill category " + _this.skillCategoryName + " delete failed";
            }
        });
    };
    DelSkillCategory = __decorate([
        core_1.Component({
            selector: 'skill-cat-del;',
            templateUrl: '../skill/delete.skill.category.html',
            styles: [
                "input.ng-touched.ng-invalid {\n      border: 1px solid red;\n    }"
            ]
        })
    ], DelSkillCategory);
    return DelSkillCategory;
}());
exports.DelSkillCategory = DelSkillCategory;
