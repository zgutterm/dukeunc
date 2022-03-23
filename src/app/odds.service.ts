import { Injectable } from '@angular/core';
import { MarchMadness, Team } from './marchmadness';
import { Observable, of} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OddsService {


  scrapeTeams(): Observable<MarchMadness> {
    const url = 'https://projects.fivethirtyeight.com/march-madness-api/2022/madness.json';
    //console.log(this.http.get<MarchMadness>(url));
    return this.http.get<MarchMadness>(url).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }



  constructor(
    private http: HttpClient
  ) { }
}
