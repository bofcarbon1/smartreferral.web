"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var DelCandidate = (function () {
    function DelCandidate(netcore2service, route) {
        this.netcore2service = netcore2service;
        this.route = route;
        this.events = []; // use later to display form changes
        this.submitted = false; //keep track of form submission
    }
    DelCandidate.prototype.ngOnInit = function () {
        var _this = this;
        this.candidateID = "0";
        //Get candiate details and bind to form for delete visual
        this.route.params.subscribe(function (params) {
            _this.candidateID = params['id'];
        });
        this.getCandidateByID();
    };
    //Get the candidate details for delete visual using
    //the NetCore2Service that we injected earlier
    DelCandidate.prototype.getCandidateByID = function () {
        var _this = this;
        this.netcore2service
            .GetCandidate(this.candidateID)
            .subscribe(function (data) { return _this.obsCandidate = data; }, function (error) { return console.log(error); }, function () {
            //Parse the observable returned results and move
            //them to our class object referenced in our form group
            _this.candidate = _this.obsCandidate;
            var candidateString = JSON.stringify(_this.obsCandidate);
            var candidateParsed = JSON.parse(candidateString);
            _this.candidateName = candidateParsed.candidate_name;
        });
    };
    DelCandidate.prototype.delCandidate = function () {
        var _this = this;
        this.submitted = true;
        //Call the candidate update via the NetCore2Service
        this.netcore2service
            .DelCandidate(this.candidateID)
            .subscribe(function (data) { return _this.obsDelResult = data; }, function (error) { return console.log(error); }, function () {
            var delResultString = JSON.stringify(_this.obsDelResult);
            var delResultParsed = JSON.parse(delResultString);
            _this.delResult = delResultParsed.responseStatus;
            if (_this.delResult === "200") {
                _this.successMessage
                    = "Candidate " + _this.candidateName + " delete was successful";
            }
            else {
                _this.successMessage
                    = "Candidate " + _this.candidateName + " delete failed";
            }
        });
        //This code must be moved to a seperate function where
        //messages are set to positive or negative after the result
        //is obtained or an error occurs attemtping to retrieve the
        //result. This will take care of the problem of a slow service
        //response. 
        //this.successMessage 
        //    = `Candidate ${this.candidateName} delete was successful`;
    };
    DelCandidate = __decorate([
        core_1.Component({
            selector: 'candidate-del;',
            templateUrl: '../candidate/delete.candidate.html',
            styles: [
                "input.ng-touched.ng-invalid {\n      border: 1px solid red;\n    }"
            ]
        })
    ], DelCandidate);
    return DelCandidate;
}());
exports.DelCandidate = DelCandidate;
