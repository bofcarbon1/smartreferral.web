import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVarService {
  public gvCriteriaSKillPct : number = 50;
  public gvCriteriaPreScreenPct : number = 25;
  public gvCriteriaCodeSamplePct : number = 15;
  public gvCriteriaVideoPct : number = 10;
}