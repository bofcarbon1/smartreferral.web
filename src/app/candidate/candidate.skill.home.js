"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var CandidateSkillHome = (function () {
    function CandidateSkillHome(netcore2service, datashareservice, route) {
        this.netcore2service = netcore2service;
        this.datashareservice = datashareservice;
        this.route = route;
    }
    CandidateSkillHome.prototype.ngOnInit = function () {
        var _this = this;
        this.candidateID = "0";
        //Get candiate details and bind to form for delete visual
        this.route.params.subscribe(function (params) {
            _this.candidateID = params['id'];
            _this.candidateName = params['name'];
        });
        //load initial data
        this.getSkills();
        this.getCandidateSkills();
    };
    CandidateSkillHome.prototype.getSkills = function () {
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
    CandidateSkillHome.prototype.getCandidateSkills = function () {
        var _this = this;
        this.netcore2service
            .GetCandidateSkills("Candidate", this.candidateID)
            .subscribe(function (data) { return _this.obsCandidateSkills = data; }, function (error) { return console.log(error); }, function () {
            var candidateSkillString = JSON.stringify(_this.obsCandidateSkills);
            var candidateSkillParsed = JSON.parse(candidateSkillString);
            var candidateSkillArray = candidateSkillParsed.result;
            _this.allcandidateskills = candidateSkillArray;
            _this.datashareservice.setCurrCandidateSkills(_this.allcandidateskills);
        });
    };
    CandidateSkillHome.prototype.selectCandidateSkill = function (candidateSkill) {
        this.selectedCandidateSkill = candidateSkill;
    };
    CandidateSkillHome = __decorate([
        core_1.Component({
            selector: 'candidateSkillHome',
            templateUrl: './candidate.skill.home.html'
        })
    ], CandidateSkillHome);
    return CandidateSkillHome;
}());
exports.CandidateSkillHome = CandidateSkillHome;
