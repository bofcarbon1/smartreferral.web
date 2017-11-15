import { RouterModule, 
  Routes, 
  Router } from '@angular/router';
import { AppComponent } from './app.component';
import { CandidateHome } from './candidate/candidateHome';
import { UpdCandidate } from './candidate/update.candidate';
import { DelCandidate } from './candidate/delete.candidate';
import { Home } from './home/home';
import { SkillHome } from './skill/skill.home';
import { UpdSkill } from './skill/update.skill';
import { DelSkill } from './skill/delete.skill';
import { UpdSkillCategory } from './skill/update.skill.category';
import { DelSkillCategory } from './skill/delete.skill.category';
import { CandidateSkillHome } from './candidate/candidate.skill.home';
import { UpdCandidateSkill } from './candidate/update.candidate.skill';
import { AddCandidateSkill } from './candidate/add.candidate.skill';
import { DelCandidateSkill } from './candidate/delete.candidate.skill';
import { CandidateReport } from './reports/candidate.report';
import { SkillMatchReport } from './reports/skill.match.report';

export const appRoutes: Routes = [
    { path: 'home', component: Home },
    { path: 'candidate-home', component: CandidateHome },
    { path: 'candidate-home/candidate-upd', component: UpdCandidate },
    { path: 'candidate-home/candidate-del', component: DelCandidate },
    { path: 'skill-home', component: SkillHome },
    { path: 'skill-home/skill-upd', component: UpdSkill },
    { path: 'skill-home/skill-del', component: DelSkill },
    { path: 'skill-home/skill-cat-upd', component: UpdSkillCategory },
    { path: 'skill-home/skill-cat-del', component: DelSkillCategory },
    { path: 'candidate-home/candidate-skill-home', 
    component: CandidateSkillHome },
    { path: 'candidate-home/candidate-skill-home/candidate-skill-upd', 
    component: UpdCandidateSkill },
    { path: 'candidate-home/candidate-skill-home/candidate-skill-add', 
    component: AddCandidateSkill },
    { path: 'candidate-home/candidate-skill-home/candidate-skill-del', 
    component: DelCandidateSkill },
    { path: 'candidate-report', component: CandidateReport },
    { path: 'skill-match-report', component: SkillMatchReport }
];
