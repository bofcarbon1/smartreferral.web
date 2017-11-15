"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var DelCandidateSkill = (function () {
    function DelCandidateSkill(netcore2service, route) {
        this.netcore2service = netcore2service;
        this.route = route;
        this.events = []; // use later to display form changes
        this.submitted = false; //keep track of form submission
    }
    DelCandidateSkill.prototype.ngOnInit = function () {
        var _this = this;
        this.candidateSkillID = "0";
        //Get candidate skill details and bind to form for delete visual
        this.route.params.subscribe(function (params) {
            _this.candidateSkillID = params['csid'];
            _this.candidateID = params['cid'];
            _this.candidateName = params['name'];
        });
        this.getCandidateSkillByID();
    };
    //Get the candidate skill details for delete visual using
    //the NetCore2Service that we injected earlier
    DelCandidateSkill.prototype.getCandidateSkillByID = function () {
        var _this = this;
        this.netcore2service
            .GetCandidateSkill(this.candidateSkillID)
            .subscribe(function (data) { return _this.obsCandidateSkill = data; }, function (error) { return console.log(error); }, function () {
            //Parse the observable returned results and move
            //them to our class object referenced in our form group
            _this.candidateskill = _this.obsCandidateSkill;
            var candidateSkillString = JSON.stringify(_this.obsCandidateSkill);
            var candidateSkillParsed = JSON.parse(candidateSkillString);
            _this.candidateSkillName = candidateSkillParsed.candidate_skill_name;
        });
    };
    DelCandidateSkill.prototype.delCandidateSkill = function () {
        var _this = this;
        this.submitted = true;
        //Call the candidate skill delete via the NetCore2Service
        this.netcore2service
            .DelCandidateSkill(this.candidateSkillID)
            .subscribe(function (data) { return _this.obsDelResult = data; }, function (error) { return console.log(error); }, function () {
            var delResultString = JSON.stringify(_this.obsDelResult);
            var delResultParsed = JSON.parse(delResultString);
            _this.delResult = delResultParsed.responseStatus;
            if (_this.delResult === "200") {
                _this.successMessage
                    = "Candidate skill " + _this.candidateSkillName + " delete was successful";
            }
            else {
                _this.successMessage
                    = "Candidate skill " + _this.candidateSkillName + " delete failed";
            }
        });
    };
    DelCandidateSkill = __decorate([
        core_1.Component({
            selector: 'candidate-skill-del;',
            templateUrl: '../candidate/delete.candidate.skill.html',
            styles: [
                "input.ng-touched.ng-invalid {\n      border: 1px solid red;\n    }"
            ]
        })
    ], DelCandidateSkill);
    return DelCandidateSkill;
}());
exports.DelCandidateSkill = DelCandidateSkill;
