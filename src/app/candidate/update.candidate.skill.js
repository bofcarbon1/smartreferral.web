"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var candidate_skill_1 = require('../candidate/candidate.skill');
var UpdCandidateSkill = (function () {
    function UpdCandidateSkill(netcore2service, fb, route) {
        this.netcore2service = netcore2service;
        this.fb = fb;
        this.route = route;
        this.events = []; // use later to display form changes
        this.submitted = false; //keep track of form submission
        this.updCandidateSkillForm = this.fb.group({
            'level': ['', forms_1.Validators.required],
            'years': ['', forms_1.Validators.required],
            'last': ['', forms_1.Validators.required]
        });
    }
    UpdCandidateSkill.prototype.ngOnInit = function () {
        var _this = this;
        this.candidateSkillID = "0";
        //Get candiate skill details and bind to form for update
        this.route.params.subscribe(function (params) {
            _this.candidateSkillID = params['id'];
        });
        //Test for new candidate skill or modify 
        if (parseInt(this.candidateSkillID) > 0) {
            this.getCandidateSkillByID();
        }
        else {
            //Set candidate skill details and bind to form for add
            this.updCandidateSkillForm = this.fb.group({
                'level': ['', forms_1.Validators.required],
                'years': ['', forms_1.Validators.required],
                'last': ['', forms_1.Validators.required]
            });
        }
    };
    UpdCandidateSkill.prototype.ngOnDestroy = function () {
    };
    //Get the candidate skills details for update using
    //the NetCore2Service that we injected earlier
    UpdCandidateSkill.prototype.getCandidateSkillByID = function () {
        var _this = this;
        this.netcore2service
            .GetCandidateSkill(this.candidateSkillID)
            .subscribe(function (data) { return _this.obsCandidateSkill = data; }, function (error) { return console.log(error); }, function () {
            //Parse the observable returned results and move
            //them to our class object referenced in our form group
            _this.candidateskill = _this.obsCandidateSkill;
            var candidateSkillString = JSON.stringify(_this.obsCandidateSkill);
            var candidateSkillParsed = JSON.parse(candidateSkillString);
            console.log("candidateSkillParsed: ", candidateSkillParsed);
            _this.level = candidateSkillParsed.level;
            _this.lastUsed = candidateSkillParsed.last_Year_Used;
            _this.yearsUsed = candidateSkillParsed.years_Used;
            _this.updCandidateSkillForm = _this.fb.group({
                'level': [_this.level, forms_1.Validators.required],
                'last': [_this.lastUsed, forms_1.Validators.required],
                'years': [_this.yearsUsed, forms_1.Validators.required]
            });
        });
    };
    UpdCandidateSkill.prototype.updCandidateSkill = function () {
        var _this = this;
        var model;
        this.submitted = true;
        model = this.updCandidateSkillForm.value;
        model.level = this.level;
        model.last_Year_Used = this.lastUsed;
        model.years_Used = this.yearsUsed;
        var candskill = new candidate_skill_1.CandidateSkill();
        Object.assign(candskill, model);
        //We use our service for data requests not the collection
        //If we have have a value in a candidate skill id then we call 
        //our update candidate skill otherwise we call our add  
        if (parseInt(this.candidateSkillID) > 0) {
            //Call the candidate skill update via the NetCore2Service
            this.netcore2service
                .UpdCandidateSkill(this.candidateSkillID, candskill)
                .subscribe(function (data) { return _this.obsUpdResult = data; }, function (error) { return console.log(error); }, function () {
                var updResultString = JSON.stringify(_this.obsUpdResult);
                var updResultParsed = JSON.parse(updResultString);
                _this.updResult = updResultParsed.responseStatus;
                if (_this.updResult === "200") {
                    _this.successMessage
                        = "Candidate skill update was successful";
                }
                else {
                    _this.successMessage
                        = "Candidate skill update failed";
                }
            });
        }
        //else {
        //  //Call the add candidate skill service method 
        //  this.netcore2service
        //    .AddCandidateSkill(candskill)
        //    .subscribe(data => this.obsAddResult = data,
        //      error => console.log(error),
        //      () => {
        //        //this.addResult = this.obsAddResult;
        //        var addResultString = JSON.stringify(this.obsAddResult);
        //        var addResultParsed = JSON.parse(addResultString);
        //        this.addResult = addResultParsed.responseStatus;
        //        if (this.addResult === "201") {
        //            this.successMessage 
        //            = `Candidate skill add was successful`;
        //            }
        //        else {
        //            this.successMessage 
        //            = `Candidate skill add failed`;
        //            }
        //      }
        //    );
        //  
        //}
    };
    //Workaround to be removed with up to date form
    UpdCandidateSkill.prototype.modifiedLevel = function (levelvalue) {
        this.level = levelvalue;
    };
    //Workaround to be removed with up to date form
    UpdCandidateSkill.prototype.modifiedLastUsed = function (lastusedvalue) {
        this.lastUsed = lastusedvalue;
    };
    //Workaround to be removed with up to date form
    UpdCandidateSkill.prototype.modifiedYearsUsed = function (yearsusedvalue) {
        this.yearsUsed = yearsusedvalue;
    };
    UpdCandidateSkill = __decorate([
        core_1.Component({
            selector: 'candidate-skill-upd',
            templateUrl: '../candidate/update.candidate.skill.html',
            styles: [
                "input.ng-touched.ng-invalid {\n      border: 1px solid red;\n    }"
            ]
        })
    ], UpdCandidateSkill);
    return UpdCandidateSkill;
}());
exports.UpdCandidateSkill = UpdCandidateSkill;
