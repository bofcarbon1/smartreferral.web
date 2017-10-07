import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,
  ReactiveFormsModule,
  FormBuilder, 
  FormGroup,
  FormControl,
  Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './routes';
import { NetCore2Service } from './netcore2.service';
import { CandidateHome } from './candidate/candidateHome';
import { UpdCandidate } from './candidate/update.candidate';
import { DelCandidate } from './candidate/delete.candidate';
import { Home } from './home/home';

@NgModule({
  declarations: [
    AppComponent, CandidateHome, UpdCandidate, DelCandidate, 
    Home
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [NetCore2Service],
  bootstrap: [AppComponent]
})
export class AppModule { }

