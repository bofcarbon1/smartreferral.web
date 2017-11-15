"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var candidate_1 = require('../candidate/candidate');
var UpdCandidate = (function () {
    function UpdCandidate(netcore2service, fb, route) {
        this.netcore2service = netcore2service;
        this.fb = fb;
        this.route = route;
        this.events = []; // use later to display form changes
        this.submitted = false; //keep track of form submission
        this.updCandidateForm = this.fb.group({
            'name': ['', forms_1.Validators.required],
            'phone': ['', forms_1.Validators.required],
            'email': ['', forms_1.Validators.required],
            'note': ['', forms_1.Validators.required],
            'screenlevel': ['0',],
            'codesamplelevel': ['0',],
            'videolevel': ['0',]
        });
    }
    UpdCandidate.prototype.ngOnInit = function () {
        var _this = this;
        this.candidateID = "0";
        //Get candiate details and bind to form for update
        this.route.params.subscribe(function (params) {
            _this.candidateID = params['id'];
        });
        //Test for new candidate or modify candidate
        if (parseInt(this.candidateID) > 0) {
            this.getCandidateByID();
        }
        else {
            //Set candidate details and bind to form for add
            this.updCandidateForm = this.fb.group({
                'name': ['', forms_1.Validators.required],
                'phone': ['', forms_1.Validators.required],
                'email': ['', forms_1.Validators.required],
                'note': ['', forms_1.Validators.required],
                'screenlevel': ['0',],
                'codesamplelevel': ['0',],
                'videolevel': ['0',]
            });
        }
    };
    UpdCandidate.prototype.ngOnDestroy = function () {
    };
    //Get the candidate details for update using
    //the NetCore2Service that we injected earlier
    UpdCandidate.prototype.getCandidateByID = function () {
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
            _this.candidatePhone = candidateParsed.candidate_phone;
            _this.candidateeMail = candidateParsed.candidate_email;
            _this.candidateNote = candidateParsed.candidate_note;
            _this.candidateCodeSampleLevel = candidateParsed.candidate_code_sample_level;
            _this.candidateScreenLevel = candidateParsed.candidate_screen_level;
            _this.candidateVideoLevel = candidateParsed.candidate_video_level;
            _this.updCandidateForm = _this.fb.group({
                'name': [_this.candidateName, forms_1.Validators.required],
                'phone': [_this.candidatePhone, forms_1.Validators.required],
                'email': [_this.candidateeMail, forms_1.Validators.required],
                'note': [_this.candidateNote, forms_1.Validators.required],
                'screenlevel': [_this.candidateScreenLevel],
                'codesamplelevel': [_this.candidateCodeSampleLevel],
                'videolevel': [_this.candidateVideoLevel]
            });
        });
    };
    UpdCandidate.prototype.updCandidate = function () {
        var _this = this;
        var model;
        this.submitted = true;
        model = this.updCandidateForm.value;
        model.candidate_name = this.candidateName;
        model.candidate_phone = this.candidatePhone;
        model.candidate_email = this.candidateeMail;
        model.candidate_note = this.candidateNote;
        model.candidate_screen_level = this.candidateScreenLevel;
        model.candidate_code_sample_level = this.candidateCodeSampleLevel;
        model.candidate_video_level = this.candidateVideoLevel;
        var cand = new candidate_1.Candidate();
        Object.assign(cand, model);
        //We use our service for data requests not the collection
        //If we have have a value in a candidate id then we call 
        //our update candidate otherwise we call our add candidate 
        if (parseInt(this.candidateID) > 0) {
            //Call the candidate update via the NetCore2Service
            this.netcore2service
                .UpdCandidate(this.candidateID, cand)
                .subscribe(function (data) { return _this.obsUpdResult = data; }, function (error) { return console.log(error); }, function () {
                var updResultString = JSON.stringify(_this.obsUpdResult);
                var updResultParsed = JSON.parse(updResultString);
                _this.updResult = updResultParsed.responseStatus;
                if (_this.updResult === "200") {
                    _this.successMessage
                        = "Candidate " + _this.candidateName + " update was successful";
                }
                else {
                    _this.successMessage
                        = "Candidate " + _this.candidateName + " update failed";
                }
            });
        }
        else {
            //Call the add candidate service 
            this.netcore2service
                .AddCandidate(cand)
                .subscribe(function (data) { return _this.obsAddResult = data; }, function (error) { return console.log(error); }, function () {
                //this.addResult = this.obsAddResult;
                var addResultString = JSON.stringify(_this.obsAddResult);
                var addResultParsed = JSON.parse(addResultString);
                _this.addResult = addResultParsed.responseStatus;
                if (_this.addResult === "201") {
                    _this.successMessage
                        = "Candidate " + _this.candidateName + " add was successful";
                }
                else {
                    _this.successMessage
                        = "Candidate " + _this.candidateName + " add failed";
                }
            });
        }
    };
    //Workaround to be removed with up to date form
    UpdCandidate.prototype.modifiedName = function (namevalue) {
        this.candidateName = namevalue;
    };
    //Workaround to be removed with up to date form
    UpdCandidate.prototype.modifiedPhone = function (phonevalue) {
        this.candidatePhone = phonevalue;
    };
    //Workaround to be removed with up to date form
    UpdCandidate.prototype.modifiedeMail = function (emailvalue) {
        this.candidateeMail = emailvalue;
    };
    //Workaround to be removed with up to date form
    UpdCandidate.prototype.modifiedNote = function (notevalue) {
        this.candidateNote = notevalue;
    };
    //Store the screen level value from form
    UpdCandidate.prototype.modifiedScreenLevel = function (screenlevelvalue) {
        this.candidateScreenLevel = screenlevelvalue;
    };
    //Store the code sample level value from form
    UpdCandidate.prototype.modifiedCodeSampleLevel = function (codesamplelevelvalue) {
        this.candidateCodeSampleLevel = codesamplelevelvalue;
    };
    //Store the video level value from form
    UpdCandidate.prototype.modifiedVideoLevel = function (videolevelvalue) {
        this.candidateVideoLevel = videolevelvalue;
    };
    UpdCandidate = __decorate([
        core_1.Component({
            selector: 'candidate-upd',
            templateUrl: '../candidate/update.candidate.html',
            styles: [
                "input.ng-touched.ng-invalid {\n      border: 1px solid red;\n    }"
            ]
        })
    ], UpdCandidate);
    return UpdCandidate;
}());
exports.UpdCandidate = UpdCandidate;
