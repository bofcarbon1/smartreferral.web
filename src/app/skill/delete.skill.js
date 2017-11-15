"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var DelSkill = (function () {
    function DelSkill(netcore2service, route) {
        this.netcore2service = netcore2service;
        this.route = route;
        this.events = []; // use later to display form changes
        this.submitted = false; //keep track of form submission
    }
    DelSkill.prototype.ngOnInit = function () {
        var _this = this;
        this.skillID = "0";
        //Get skill details and bind to form for delete visual
        this.route.params.subscribe(function (params) {
            _this.skillID = params['id'];
        });
        this.getSkillByID();
    };
    //Get the skill details for delete visual using
    //the NetCore2Service that we injected earlier
    DelSkill.prototype.getSkillByID = function () {
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
        });
    };
    DelSkill.prototype.delSkill = function () {
        var _this = this;
        this.submitted = true;
        //Call the skill delete via the NetCore2Service
        this.netcore2service
            .DelSkill(this.skillID)
            .subscribe(function (data) { return _this.obsDelResult = data; }, function (error) { return console.log(error); }, function () {
            var delResultString = JSON.stringify(_this.obsDelResult);
            var delResultParsed = JSON.parse(delResultString);
            _this.delResult = delResultParsed.responseStatus;
            if (_this.delResult === "200") {
                _this.successMessage
                    = "Skill " + _this.skillName + " delete was successful";
            }
            else {
                _this.successMessage
                    = "Skill " + _this.skillName + " delete failed";
            }
        });
    };
    DelSkill = __decorate([
        core_1.Component({
            selector: 'skill-del;',
            templateUrl: '../skill/delete.skill.html',
            styles: [
                "input.ng-touched.ng-invalid {\n      border: 1px solid red;\n    }"
            ]
        })
    ], DelSkill);
    return DelSkill;
}());
exports.DelSkill = DelSkill;
