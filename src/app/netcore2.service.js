"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
var NetCore2Service = (function () {
    function NetCore2Service(http) {
        var _this = this;
        this.http = http;
        this.GetCandidates = function () {
            return _this.http.get(_this.actionUrlCandidates)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.GetCandidate = function (candidateID) {
            return _this.http.get(_this.actionUrlCandidate + candidateID)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.AddCandidate = function (cand) {
            return _this.http.put(_this.actionUrlnewCandidate, cand)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.UpdCandidate = function (candidateID, cand) {
            return _this.http.post(_this.actionUrlupdCandidate + candidateID, cand)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.DelCandidate = function (candidateID) {
            return _this.http.delete(_this.actionUrldelCandidate + candidateID)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.GetSkills = function () {
            return _this.http.get(_this.actionUrlSkills)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.GetSkill = function (skillID) {
            return _this.http.get(_this.actionUrlSkill + skillID)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.GetSkillsByCategory = function (skillCategoryID) {
            return _this.http.get(_this.actionUrlSkillsByCategory + skillCategoryID)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.GetSkillsAvailableForCandidate = function (candidateID) {
            return _this.http.get(_this.actionUrlSkillsAvailableForCandidate + candidateID)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.AddSkill = function (skil) {
            return _this.http.put(_this.actionUrlnewSkill, skil)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.UpdSkill = function (skillID, skil) {
            return _this.http.post(_this.actionUrlupdSkill + skillID, skil)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.DelSkill = function (skillID) {
            return _this.http.delete(_this.actionUrldelSkill + skillID)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.GetSkillCategories = function () {
            return _this.http.get(_this.actionUrlSkillCategories)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.GetSkillCategory = function (skillCategoryID) {
            return _this.http.get(_this.actionUrlSkillCategory + skillCategoryID)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.AddSkillCategory = function (cat) {
            return _this.http.put(_this.actionUrlnewSkillCategory, cat)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.UpdSkillCategory = function (skillCategoryID, cat) {
            return _this.http.post(_this.actionUrlupdSkillCategory + skillCategoryID, cat)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.DelSkillCategory = function (skillCategoryID) {
            return _this.http.delete(_this.actionUrldelSkillCategory + skillCategoryID)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.GetCandidateSkills = function (filter, candidateID) {
            return _this.http.get(_this.actionUrlCandidateSkills
                + filter + "/" + candidateID)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.GetCandidateSkill = function (candidateSkillID) {
            return _this.http.get(_this.actionUrlCandidateSkill + candidateSkillID)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.AddCandidateSkills = function (candidateSkillID, candskills) {
            return _this.http.put(_this.actionUrlnewCandidateSkills
                + candidateSkillID, candskills)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.UpdCandidateSkill = function (candidateSkillID, candskill) {
            return _this.http.post(_this.actionUrlupdCandidateSkill
                + candidateSkillID, candskill)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.DelCandidateSkill = function (candidateSkillID) {
            return _this.http.delete(_this.actionUrldelCandidateSkill
                + candidateSkillID)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.GetCriteria = function () {
            return _this.http.get(_this.actionUrlCriteria)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.actionUrlCandidates =
            'http://localhost:54239/api/candidate/candidates';
        this.actionUrlCandidate =
            'http://localhost:54239/api/candidate/candidate/';
        this.actionUrlnewCandidate =
            'http://localhost:54239/api/candidate/addcandidate/';
        this.actionUrlupdCandidate =
            'http://localhost:54239/api/candidate/updcandidate/';
        this.actionUrldelCandidate =
            'http://localhost:54239/api/candidate/delcandidate/';
        this.actionUrlSkills =
            'http://localhost:54239/api/skill/skills';
        this.actionUrlSkill =
            'http://localhost:54239/api/skill/skill/';
        this.actionUrlSkillsByCategory =
            'http://localhost:54239/api/skill/skillsbycategory/';
        this.actionUrlnewSkill =
            'http://localhost:54239/api/skill/addskill/';
        this.actionUrlupdSkill =
            'http://localhost:54239/api/skill/updskill/';
        this.actionUrldelSkill =
            'http://localhost:54239/api/skill/delskill/';
        this.actionUrlSkillCategories =
            'http://localhost:54239/api/skill/categories';
        this.actionUrlSkillCategory =
            'http://localhost:54239/api/skill/category/';
        this.actionUrlnewSkillCategory =
            'http://localhost:54239/api/skill/addcategory/';
        this.actionUrlupdSkillCategory =
            'http://localhost:54239/api/skill/updcategory/';
        this.actionUrldelSkillCategory =
            'http://localhost:54239/api/skill/delcategory/';
        this.actionUrlCandidateSkills =
            'http://localhost:54239/api/candidate/candidateskills/';
        this.actionUrlCandidateSkill =
            'http://localhost:54239/api/candidate/candidateskill/';
        this.actionUrlnewCandidateSkills =
            'http://localhost:54239/api/candidate/addcandidateskills/';
        this.actionUrlupdCandidateSkill =
            'http://localhost:54239/api/candidate/updcandidateskill/';
        this.actionUrldelCandidateSkill =
            'http://localhost:54239/api/candidate/delcandidateskill/';
        this.actionUrlSkillsAvailableForCandidate =
            'http://localhost:54239/api/skill/skillsavailableforcandidate/';
        this.actionUrlCriteria =
            'http://localhost:54239/api/criteria/criteria';
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    NetCore2Service.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    NetCore2Service = __decorate([
        core_1.Injectable()
    ], NetCore2Service);
    return NetCore2Service;
}());
exports.NetCore2Service = NetCore2Service;
