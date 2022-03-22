import { Component, OnInit } from '@angular/core';
import { Team } from '../team';
import { OddsService } from '../odds.service';
import axios from 'axios';
import { ActionSequence } from 'protractor';

@Component({
  selector: 'app-odds',
  templateUrl: './odds.component.html',
  styleUrls: ['./odds.component.css']
})

export class OddsComponent implements OnInit {
  

  teams: Team[] = [];

  constructor(private oddsService: OddsService) { 
  }

  scrapeTeams(): void {
    const url = 'https://projects.fivethirtyeight.com/2022-march-madness-predictions/';
    const AxiosInstance = axios.create();

    AxiosInstance.get(url)
  .then( // Once we have data returned ...
    response => {
      const html = response.data; // Get the HTML from the HTTP request
      console.log(html);
    }
  )
  .catch(console.error); // Error handling
  }

  getTeams(): void {
    this.oddsService.getTeams()
      .subscribe(teams => this.teams = teams);
  }

  ngOnInit(): void{
    this.getTeams();
    this.scrapeTeams();
  }

}
