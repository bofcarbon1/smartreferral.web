import {Injectable} from '@angular/core';

//Set and get data between components
@Injectable()
export class DataShareService {
    
    currCandidateSkills:string;
    
    
    constructor() {
        this.currCandidateSkills = "No current skills";
    }
    
    setCurrCandidateSkills(newCurrCandidateSkills : string) {
        this.currCandidateSkills = newCurrCandidateSkills;
    }
    
    getCurrCandidateSkills() {
        return this.currCandidateSkills;
    }

}
