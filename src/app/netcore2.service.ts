import { Injectable } from '@angular/core';
import { Http, 
    Response, 
    RequestOptions, 
    Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import { Candidate } from './candidate/candidate';

@Injectable()
export class NetCore2Service {
    public headers: Headers;
    actionUrlCandidates:string;
    actionUrlCandidate:string;
    actionUrlnewCandidate:string;
    actionUrlupdCandidate:string;
    actionUrldelCandidate:string;
    
    constructor(private http: Http) {
        this.actionUrlCandidates =
            'http://localhost:54239/api/candidate/candidates';
        this.actionUrlCandidate =
            'http://localhost:54239/api/candidate/candidate/';
        this.actionUrlnewCandidate =
            'http://localhost:54239/api/candidate/addcandidate/';
        this.actionUrlupdCandidate =
            'http://localhost:54239/api/candidate/updcandidate/';
        this.actionUrldelCandidate =
            'http://localhost:54239/api/candidate/delcandidate/';
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    
    public GetCandidates = (): Observable<any> => {
        return this.http.get(this.actionUrlCandidates)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetCandidate = (candidateID): Observable<any> => {
        return this.http.get(this.actionUrlCandidate + candidateID)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public AddCandidate = (cand): Observable<any> => {
        return this.http.put(this.actionUrlnewCandidate, cand)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public UpdCandidate = (candidateID, cand): Observable<any> => {
        return this.http.post(this.actionUrlupdCandidate + candidateID, cand)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public DelCandidate = (candidateID): Observable<any> => {
        return this.http.delete(this.actionUrldelCandidate + candidateID)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    
}