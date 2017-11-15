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
  templateUrl: './candidateHome.html',
    styles: [
    `
    p {
       font-size: .80em;
    }
    
    table {
      border: 1px solid black;
      font-size: .80em;
    }
       
   ` 
    ]
})

export class CandidateHome implements OnInit {
  allcandidates:string;
  public obsCandidates:string;
  selectedCandidate: Candidate;
  p: number = 1; //for table pagination
  
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