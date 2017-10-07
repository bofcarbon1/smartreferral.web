import {Component,  OnInit} from '@angular/core';
import { Http, 
  Response, 
  RequestOptions, 
  HttpModule, 
  Headers } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NetCore2Service } from '../netcore2.service';
import { Candidate } from '../candidate/candidate';
import { appRoutes } from '../routes';

@Component({
  selector: 'candidateHome',
  templateUrl: './candidateHome.html'
})

export class CandidateHome implements OnInit {
  allcandidates:string;
  public obsCandidates:string;
  selectedCandidate: Candidate;
  
  constructor(public netcore2service : NetCore2Service) {
      
  }
  
  ngOnInit() {
    this.getCandidates();
  }
  
  private getCandidates(): void {
    this.netcore2service
      .GetCandidates()
      .subscribe(data => this.obsCandidates = data,
        error => console.log(error),
        () => {
          var candidateString = JSON.stringify(this.obsCandidates);
          var candidateParsed = JSON.parse(candidateString);
          var candidateArray = candidateParsed.result;
          this.allcandidates = candidateArray;
          }
      );
  }
  
  selectCandidate(candidate: Candidate){
    this.selectedCandidate = candidate;
  }
  
} 