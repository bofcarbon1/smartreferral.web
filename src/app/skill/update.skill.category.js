"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var skill_category_1 = require('../skill/skill.category');
var UpdSkillCategory = (function () {
    function UpdSkillCategory(netcore2service, fb, route) {
        this.netcore2service = netcore2service;
        this.fb = fb;
        this.route = route;
        this.events = []; // use later to display form changes
        this.submitted = false; //keep track of form submission
        this.categories = [
            'web',
            'database',
            'service'
        ];
        this.updSkillCategoryForm = this.fb.group({
            'name': ['', forms_1.Validators.required]
        });
    }
    UpdSkillCategory.prototype.ngOnInit = function () {
        var _this = this;
        this.skillCategoryID = "0";
        //Get skill category details and bind to form for update
        this.route.params.subscribe(function (params) {
            _this.skillCategoryID = params['id'];
        });
        //Test for new or modify skill
        if (parseInt(this.skillCategoryID) > 0) {
            this.getSkillCategoryByID();
        }
        else {
            //Set skill category details and bind to form for add
            this.updSkillCategoryForm = this.fb.group({
                'name': ['', forms_1.Validators.required]
            });
        }
    };
    UpdSkillCategory.prototype.ngOnDestroy = function () {
    };
    //Get the skill category name of the preselected category
    //in the select list or the category for update via service NetCore2Service
    UpdSkillCategory.prototype.getSkillCategoryByID = function () {
        var _this = this;
        console.log("this.skillCategoryID", this.skillCategoryID);
        this.netcore2service
            .GetSkillCategory(this.skillCategoryID)
            .subscribe(function (data) { return _this.obsSkillCategory = data; }, function (error) { return console.log(error); }, function () {
            //Parse the observable returned results and bind them
            //them to class objects including the category form group
            _this.skillCategory = _this.obsSkillCategory;
            var skillCategoryString = JSON.stringify(_this.obsSkillCategory);
            var skillCategoryParsed = JSON.parse(skillCategoryString);
            _this.skillCategoryName = skillCategoryParsed.skill_Category_Name;
            _this.updSkillCategoryForm = _this.fb.group({
                'name': [_this.skillCategoryName, forms_1.Validators.required]
            });
        });
    };
    UpdSkillCategory.prototype.updSkillCategory = function () {
        var _this = this;
        var model;
        this.submitted = true;
        model = this.updSkillCategoryForm.value;
        model.skill_category_name = this.skillCategoryName;
        var scat = new skill_category_1.SkillCategory();
        Object.assign(scat, model);
        //We use our service for data requests not the collection
        //If we have have a value in a candidate id then we call 
        //our update candidate otherwise we call our add candidate 
        if (parseInt(this.skillCategoryID) > 0) {
            //Call the skill category update via the NetCore2Service
            this.netcore2service
                .UpdSkillCategory(this.skillCategoryID, scat)
                .subscribe(function (data) { return _this.obsUpdResult = data; }, function (error) { return console.log(error); }, function () {
                var updResultString = JSON.stringify(_this.obsUpdResult);
                var updResultParsed = JSON.parse(updResultString);
                _this.updResult = updResultParsed.responseStatus;
                if (_this.updResult === "200") {
                    _this.successMessage
                        = "Skill category " + _this.skillCategoryName + " update was successful";
                }
                else {
                    _this.successMessage
                        = "Skill category " + _this.skillCategoryName + " update failed";
                }
            });
        }
        else {
            //Call the add skill category service  
            this.netcore2service
                .AddSkillCategory(scat)
                .subscribe(function (data) { return _this.obsAddResult = data; }, function (error) { return console.log(error); }, function () {
                var addResultString = JSON.stringify(_this.obsAddResult);
                var addResultParsed = JSON.parse(addResultString);
                _this.addResult = addResultParsed.responseStatus;
                if (_this.addResult === "201") {
                    _this.successMessage
                        = "Skill category " + _this.skillCategoryName + " add was successful";
                }
                else {
                    _this.successMessage
                        = "Skill category " + _this.skillCategoryName + " add failed";
                }
            });
        }
    };
    //Workaround to be removed with up to date form
    UpdSkillCategory.prototype.modifiedName = function (namevalue) {
        this.skillCategoryName = namevalue;
    };
    UpdSkillCategory = __decorate([
        core_1.Component({
            selector: 'skill-cat-upd',
            templateUrl: '../skill/update.skill.category.html',
            styles: [
                "input.ng-touched.ng-invalid {\n      border: 1px solid red;\n    }"
            ]
        })
    ], UpdSkillCategory);
    return UpdSkillCategory;
}());
exports.UpdSkillCategory = UpdSkillCategory;
