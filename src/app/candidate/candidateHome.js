"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var CandidateHome = (function () {
    function CandidateHome(netcore2service) {
        this.netcore2service = netcore2service;
    }
    CandidateHome.prototype.ngOnInit = function () {
        this.getCandidates();
    };
    CandidateHome.prototype.getCandidates = function () {
        var _this = this;
        this.netcore2service
            .GetCandidates()
            .subscribe(function (data) { return _this.obsCandidates = data; }, function (error) { return console.log(error); }, function () {
            var candidateString = JSON.stringify(_this.obsCandidates);
            var candidateParsed = JSON.parse(candidateString);
            var candidateArray = candidateParsed.result;
            _this.allcandidates = candidateArray;
        });
    };
    CandidateHome.prototype.selectCandidate = function (candidate) {
        this.selectedCandidate = candidate;
    };
    CandidateHome = __decorate([
        core_1.Component({
            selector: 'candidateHome',
            templateUrl: './candidateHome.html'
        })
    ], CandidateHome);
    return CandidateHome;
}());
exports.CandidateHome = CandidateHome;
