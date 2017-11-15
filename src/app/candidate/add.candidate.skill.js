"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AddCandidateSkill = (function () {
    function AddCandidateSkill(netcore2service, datashareservice, route) {
        this.netcore2service = netcore2service;
        this.datashareservice = datashareservice;
        this.route = route;
        this.events = []; // use later to display form changes
        this.submitted = false; //keep track of form submission
    }
    AddCandidateSkill.prototype.ngOnInit = function () {
        var _this = this;
        this.candidateID = "0";
        //Get candiate skills available to bind to form for add
        this.route.params.subscribe(function (params) {
            _this.candidateID = params['id'];
            _this.candidateName = params['name'];
        });
        //Get the candidate current skills for display
        this.currCandidateSkills = this.datashareservice.getCurrCandidateSkills();
        //Validate that there is a valid candidate ID to add skills for 
        if (parseInt(this.candidateID) > 0) {
            this.getSkillsAvailableForCandidate();
        }
        else {
            //Return error message here and log it.
            console.log("add.candidate.skill.ts: ngOnInit: invalid canddidateID", this.candidateID);
        }
        // Text configuration
        this.myTexts = {
            checkAll: 'Select all',
            uncheckAll: 'Unselect all',
            checked: 'item selected',
            checkedPlural: 'items selected',
            defaultTitle: 'Select',
            allSelected: 'All selected'
        };
        // Settings configuration
        this.mySettings = {
            checkedStyle: 'fontawesome',
            buttonClasses: 'btn btn-default btn-block',
            dynamicTitleMaxItems: 3,
            displayAllSelectedText: true
        };
    };
    AddCandidateSkill.prototype.ngOnDestroy = function () {
    };
    //Get the candidate skills details for add using
    //the NetCore2Service that we injected earlier
    AddCandidateSkill.prototype.getSkillsAvailableForCandidate = function () {
        var _this = this;
        this.netcore2service
            .GetSkillsAvailableForCandidate(this.candidateID)
            .subscribe(function (data) { return _this.obsAvailableSkills = data; }, function (error) { return console.log(error); }, function () {
            //Parse the observable returned results and move
            //them to our class object referenced in our form group
            var skillString = JSON.stringify(_this.obsAvailableSkills);
            var skillParsed = JSON.parse(skillString);
            var skillArray = skillParsed.result;
            _this.availableskills = skillArray;
        });
    };
    AddCandidateSkill.prototype.addCandidateSkills = function () {
        var _this = this;
        this.submitted = true;
        if (parseInt(this.candidateID) > 0) {
            //Call the add candidate skill service method 
            this.netcore2service
                .AddCandidateSkills(this.candidateID, this.optionsModel)
                .subscribe(function (data) { return _this.obsAddResult = data; }, function (error) { return console.log(error); }, function () {
                var addResultString = JSON.stringify(_this.obsAddResult);
                var addResultParsed = JSON.parse(addResultString);
                _this.addResult = addResultParsed.responseStatus;
                if (_this.addResult === "0") {
                    _this.successMessage = "Candidate skill add request was successful";
                }
                else {
                    _this.successMessage = "Candidate skill add request failed";
                }
            });
        }
        else {
            //We are missing a candidate ID log error message
            console.log("add.candidate.skill.ts: addCandidateSkill: invalid canddidateID", this.candidateID);
            this.successMessage = "Invalid candidate skill add request was not successful";
        }
    };
    //Workaround to be removed with up to date form
    AddCandidateSkill.prototype.onChange = function () {
        //console.log("onChange: this.optionsModel: ", this.optionsModel);
    };
    AddCandidateSkill = __decorate([
        core_1.Component({
            selector: 'candidate-skill-add',
            templateUrl: '../candidate/add.candidate.skill.html',
            styles: [
                "input.ng-touched.ng-invalid {\n      border: 1px solid red;\n    }"
            ]
        })
    ], AddCandidateSkill);
    return AddCandidateSkill;
}());
exports.AddCandidateSkill = AddCandidateSkill;
