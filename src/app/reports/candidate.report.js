"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var CandidateReport = (function () {
    function CandidateReport(netcore2service) {
        this.netcore2service = netcore2service;
    }
    CandidateReport.prototype.ngOnInit = function () {
        this.getCriteria();
        this.getCandidates();
        //this.buildCandidateReport();
    };
    CandidateReport.prototype.getCriteria = function () {
        var _this = this;
        //Get the criteria andidate individual details
        this.netcore2service
            .GetCriteria()
            .subscribe(function (data) { return _this.obsCriteria = data; }, function (error) { return console.log(error); }, function () {
            var criteriaString = JSON.stringify(_this.obsCriteria);
            var criteriaParsed = JSON.parse(criteriaString);
            var criteriaArray = criteriaParsed.result;
            _this.allcriteria = criteriaArray;
        });
    };
    CandidateReport.prototype.getCandidates = function () {
        var _this = this;
        //Get the candidate individual details
        this.netcore2service
            .GetCandidates()
            .subscribe(function (data) { return _this.obsCandidates = data; }, function (error) { return console.log(error); }, function () {
            var candidateString = JSON.stringify(_this.obsCandidates);
            var candidateParsed = JSON.parse(candidateString);
            var candidateArray = candidateParsed.result;
            _this.allcandidates = candidateArray;
        });
    };
    CandidateReport.prototype.buildCandidateReportDetails = function () {
        //Get the criteria used in calculations
    };
    CandidateReport.prototype.selectCandidate = function (candidate) {
        this.selectedCandidate = candidate;
    };
    CandidateReport = __decorate([
        core_1.Component({
            selector: 'candidate.report',
            templateUrl: './candidate.report.html'
        })
    ], CandidateReport);
    return CandidateReport;
}());
exports.CandidateReport = CandidateReport;
