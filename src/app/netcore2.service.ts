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
    actionUrlSkills:string;
    actionUrlSkill:string;
    actionUrlSkillsByCategory:string;
    actionUrlnewSkill:string;
    actionUrlupdSkill:string;
    actionUrldelSkill:string;
    actionUrlSkillCategories:string;
    actionUrlSkillCategory:string;
    actionUrlnewSkillCategory:string;
    actionUrlupdSkillCategory:string;
    actionUrldelSkillCategory:string;
    actionUrlCandidateSkills:string;
    actionUrlSkillsAvailableForCandidate:string;
    actionUrlCandidateSkill:string;
    actionUrlnewCandidateSkills:string;
    actionUrlupdCandidateSkill:string;
    actionUrldelCandidateSkill:string;
    actionUrlCriteria:string;
    actionUrlSkillsMatchCount:string;
    
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
        this.actionUrlSkills =
            'http://localhost:54239/api/skill/skills';
        this.actionUrlSkill =
            'http://localhost:54239/api/skill/skill/';
        this.actionUrlSkillsByCategory =
            'http://localhost:54239/api/skill/skillsbycategory/';
        this.actionUrlnewSkill =
            'http://localhost:54239/api/skill/addskill/';
        this.actionUrlupdSkill =
            'http://localhost:54239/api/skill/updskill/';
        this.actionUrldelSkill =
            'http://localhost:54239/api/skill/delskill/';
        this.actionUrlSkillCategories =
            'http://localhost:54239/api/skill/categories';
        this.actionUrlSkillCategory =
            'http://localhost:54239/api/skill/category/';
        this.actionUrlnewSkillCategory =
            'http://localhost:54239/api/skill/addcategory/';
        this.actionUrlupdSkillCategory =
            'http://localhost:54239/api/skill/updcategory/';
        this.actionUrldelSkillCategory =
            'http://localhost:54239/api/skill/delcategory/';
        this.actionUrlCandidateSkills =
            'http://localhost:54239/api/candidate/candidateskills/';
        this.actionUrlCandidateSkill =
            'http://localhost:54239/api/candidate/candidateskill/';
        this.actionUrlnewCandidateSkills =
            'http://localhost:54239/api/candidate/addcandidateskills/';
        this.actionUrlupdCandidateSkill =
            'http://localhost:54239/api/candidate/updcandidateskill/';
        this.actionUrldelCandidateSkill =
            'http://localhost:54239/api/candidate/delcandidateskill/'; 
        this.actionUrlSkillsAvailableForCandidate =
            'http://localhost:54239/api/skill/skillsavailableforcandidate/';
        this.actionUrlCriteria =
            'http://localhost:54239/api/criteria/criteria';
        this.actionUrlSkillsMatchCount =
            'http://localhost:54239/api/skill/skillsmatchcounts/';
            
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
    
    public GetSkills = (): Observable<any> => {
        return this.http.get(this.actionUrlSkills)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetSkill = (skillID): Observable<any> => {
        return this.http.get(this.actionUrlSkill + skillID)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetSkillsByCategory = (skillCategoryID): Observable<any> => {
        return this.http.get(this.actionUrlSkillsByCategory + skillCategoryID)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetSkillsAvailableForCandidate = (candidateID): Observable<any> => {
        return this.http.get(this.actionUrlSkillsAvailableForCandidate + candidateID)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetSkillsMatchCounts = (skillids): Observable<any> => {
        return this.http.put(this.actionUrlSkillsMatchCount, skillids)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public AddSkill = (skil): Observable<any> => {
        return this.http.put(this.actionUrlnewSkill, skil)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public UpdSkill = (skillID, skil): Observable<any> => {
        return this.http.post(this.actionUrlupdSkill + skillID, skil)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public DelSkill = (skillID): Observable<any> => {
        return this.http.delete(this.actionUrldelSkill + skillID)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetSkillCategories = (): Observable<any> => {
        return this.http.get(this.actionUrlSkillCategories)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetSkillCategory = (skillCategoryID): Observable<any> => {
        return this.http.get(this.actionUrlSkillCategory + skillCategoryID)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public AddSkillCategory = (cat): Observable<any> => {
        return this.http.put(this.actionUrlnewSkillCategory, cat)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public UpdSkillCategory = (skillCategoryID, cat): Observable<any> => {
        return this.http.post(this.actionUrlupdSkillCategory + skillCategoryID, cat)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public DelSkillCategory = (skillCategoryID): Observable<any> => {
        return this.http.delete(this.actionUrldelSkillCategory + skillCategoryID)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetCandidateSkills = (filter, candidateID): Observable<any> => {
        return this.http.get(this.actionUrlCandidateSkills
         + filter + "/" + candidateID)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetCandidateSkill = (candidateSkillID): Observable<any> => {
        return this.http.get(this.actionUrlCandidateSkill + candidateSkillID)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public AddCandidateSkills = (candidateSkillID, candskills): Observable<any> => {
        return this.http.put(this.actionUrlnewCandidateSkills 
        + candidateSkillID, candskills)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public UpdCandidateSkill = (candidateSkillID, candskill): Observable<any> => {
        return this.http.post(this.actionUrlupdCandidateSkill 
        + candidateSkillID, candskill)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public DelCandidateSkill = (candidateSkillID): Observable<any> => {
        return this.http.delete(this.actionUrldelCandidateSkill 
        + candidateSkillID)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    
    public GetCriteria = (): Observable<any> => {
        return this.http.get(this.actionUrlCriteria)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
}