"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var skill_1 = require('../skill/skill');
var UpdSkill = (function () {
    function UpdSkill(netcore2service, fb, route) {
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
        this.updSkillForm = this.fb.group({
            'name': ['', forms_1.Validators.required],
            'category': ['web']
        });
    }
    UpdSkill.prototype.ngOnInit = function () {
        var _this = this;
        this.skillID = "0";
        //Get skill details and bind to form for update
        this.route.params.subscribe(function (params) {
            _this.skillID = params['id'];
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
                'name': ['', forms_1.Validators.required],
                'category': ['web']
            });
        }
    };
    UpdSkill.prototype.ngOnDestroy = function () {
    };
    //Get the skill details for update using
    //the NetCore2Service that we injected earlier
    UpdSkill.prototype.getSkillByID = function () {
        var _this = this;
        this.netcore2service
            .GetSkill(this.skillID)
            .subscribe(function (data) { return _this.obsSkill = data; }, function (error) { return console.log(error); }, function () {
            //Parse the observable returned results and move
            //them to our class object referenced in our form group
            _this.skill = _this.obsSkill;
            var skillString = JSON.stringify(_this.obsSkill);
            var skillParsed = JSON.parse(skillString);
            _this.skillName = skillParsed.skill_Name;
            _this.categoryPreselectValue = skillParsed.skill_Category_ID;
            _this.skillCategoryID = _this.categoryPreselectValue;
            _this.getSkillCategoryByID();
            _this.updSkillForm = _this.fb.group({
                'name': [_this.skillName, forms_1.Validators.required]
            });
        });
    };
    UpdSkill.prototype.getSkillCategories = function () {
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
    //Get the skill category name of the preselected category
    //in the select list or the category for update via service NetCore2Service
    UpdSkill.prototype.getSkillCategoryByID = function () {
        var _this = this;
        this.netcore2service
            .GetSkillCategory(this.skillCategoryID)
            .subscribe(function (data) { return _this.obsSkillCategory = data; }, function (error) { return console.log(error); }, function () {
            //Parse the observable returned results and bind them
            //them to class objects using skill category 
            _this.skillCategory = _this.obsSkillCategory;
            var skillCategoryString = JSON.stringify(_this.obsSkillCategory);
            var skillCategoryParsed = JSON.parse(skillCategoryString);
            _this.categoryPreselectText = skillCategoryParsed.skill_Category_Name;
        });
    };
    UpdSkill.prototype.updSkill = function () {
        var _this = this;
        var model;
        this.submitted = true;
        model = this.updSkillForm.value;
        model.skill_name = this.skillName;
        model.skill_Category_ID = this.skillCategoryID;
        var skil = new skill_1.Skill();
        Object.assign(skil, model);
        //We use our service for data requests not the collection
        //If we have have a value in a candidate id then we call 
        //our update candidate otherwise we call our add candidate 
        if (parseInt(this.skillID) > 0) {
            //Call the skill update via the NetCore2Service
            this.netcore2service
                .UpdSkill(this.skillID, skil)
                .subscribe(function (data) { return _this.obsUpdResult = data; }, function (error) { return console.log(error); }, function () {
                var updResultString = JSON.stringify(_this.obsUpdResult);
                var updResultParsed = JSON.parse(updResultString);
                _this.updResult = updResultParsed.responseStatus;
                if (_this.updResult === "200") {
                    _this.successMessage
                        = "Skill " + _this.skillName + " update was successful";
                }
                else {
                    _this.successMessage
                        = "Skill " + _this.skillName + " update failed";
                }
            });
        }
        else {
            //Call the add skill service 
            this.netcore2service
                .AddSkill(skil)
                .subscribe(function (data) { return _this.obsAddResult = data; }, function (error) { return console.log(error); }, function () {
                var addResultString = JSON.stringify(_this.obsAddResult);
                var addResultParsed = JSON.parse(addResultString);
                _this.addResult = addResultParsed.responseStatus;
                if (_this.addResult === "201") {
                    _this.successMessage
                        = "Skill " + _this.skillName + " add was successful";
                }
                else {
                    _this.successMessage
                        = "Skill " + _this.skillName + " add failed";
                }
            });
        }
    };
    //Workaround to be removed with up to date form
    UpdSkill.prototype.modifiedName = function (namevalue) {
        this.skillName = namevalue;
    };
    //Workaround to be removed with up to date form
    UpdSkill.prototype.modifiedCategory = function (categoryvalue) {
        this.skillCategoryID = categoryvalue;
    };
    UpdSkill = __decorate([
        core_1.Component({
            selector: 'skill-upd',
            templateUrl: '../skill/update.skill.html',
            styles: [
                "input.ng-touched.ng-invalid {\n      border: 1px solid red;\n    }"
            ]
        })
    ], UpdSkill);
    return UpdSkill;
}());
exports.UpdSkill = UpdSkill;
