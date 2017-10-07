import { RouterModule, 
  Routes, 
  Router } from '@angular/router';
import { AppComponent } from './app.component';
import { CandidateHome } from './candidate/candidateHome';
import { UpdCandidate } from './candidate/update.candidate';
import { DelCandidate } from './candidate/delete.candidate';
import { Home } from './home/home';

export const appRoutes: Routes = [
    { path: 'home', component: Home },
    { path: 'candidate-home', component: CandidateHome },
    { path: 'candidate-home/candidate-upd', component: UpdCandidate },
    { path: 'candidate-home/candidate-del', component: DelCandidate }
];
