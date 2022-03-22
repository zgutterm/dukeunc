import { Injectable } from '@angular/core';
import { Team } from './team';
import { TEAMS } from './mock-teams';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OddsService {

  getTeams(): Observable<Team[]> {
    const teams = of(TEAMS);
    return teams;
  }

  constructor() { }
}
