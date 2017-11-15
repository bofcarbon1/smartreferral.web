"use strict";
var candidateHome_1 = require('./candidate/candidateHome');
var update_candidate_1 = require('./candidate/update.candidate');
var delete_candidate_1 = require('./candidate/delete.candidate');
var home_1 = require('./home/home');
var skill_home_1 = require('./skill/skill.home');
var update_skill_1 = require('./skill/update.skill');
var delete_skill_1 = require('./skill/delete.skill');
var update_skill_category_1 = require('./skill/update.skill.category');
var delete_skill_category_1 = require('./skill/delete.skill.category');
var candidate_skill_home_1 = require('./candidate/candidate.skill.home');
var update_candidate_skill_1 = require('./candidate/update.candidate.skill');
var add_candidate_skill_1 = require('./candidate/add.candidate.skill');
var delete_candidate_skill_1 = require('./candidate/delete.candidate.skill');
exports.appRoutes = [
    { path: 'home', component: home_1.Home },
    { path: 'candidate-home', component: candidateHome_1.CandidateHome },
    { path: 'candidate-home/candidate-upd', component: update_candidate_1.UpdCandidate },
    { path: 'candidate-home/candidate-del', component: delete_candidate_1.DelCandidate },
    { path: 'skill-home', component: skill_home_1.SkillHome },
    { path: 'skill-home/skill-upd', component: update_skill_1.UpdSkill },
    { path: 'skill-home/skill-del', component: delete_skill_1.DelSkill },
    { path: 'skill-home/skill-cat-upd', component: update_skill_category_1.UpdSkillCategory },
    { path: 'skill-home/skill-cat-del', component: delete_skill_category_1.DelSkillCategory },
    { path: 'candidate-home/candidate-skill-home',
        component: candidate_skill_home_1.CandidateSkillHome },
    { path: 'candidate-home/candidate-skill-home/candidate-skill-upd',
        component: update_candidate_skill_1.UpdCandidateSkill },
    { path: 'candidate-home/candidate-skill-home/candidate-skill-add',
        component: add_candidate_skill_1.AddCandidateSkill },
    { path: 'candidate-home/candidate-skill-home/candidate-skill-del',
        component: delete_candidate_skill_1.DelCandidateSkill },
    { path: 'candidate-home', component: candidateHome_1.CandidateHome },
];
