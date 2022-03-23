import { Component, OnInit } from '@angular/core';
import { MarchMadness, Team } from '../marchmadness';
import { OddsService } from '../odds.service';

@Component({
  selector: 'app-odds',
  templateUrl: './odds.component.html',
  styleUrls: ['./odds.component.css']
})

export class OddsComponent implements OnInit {
  

  teams: Team[] = [];
  unc: Team;
  duke: Team;
  marchmadness: MarchMadness;
  constructor(private oddsService: OddsService) { 
  }

//  getStreamers(): void {
//   this.oddsService.scrapeTeams()
//   .subscribe((value: string) => {
//     console.log(`Name: ${value}`)
//   })
//  }

  getData(): void {
    this.oddsService.scrapeTeams()
      .subscribe((marchmadness: MarchMadness) => {
        this.marchmadness = marchmadness
        this.getTeams(this.marchmadness)
      });

  }

  getTeams(mmdata: MarchMadness): void{
    this.teams = mmdata.forecasts.mens['current_run'].teams
    this.getUNCDuke(this.teams)
  }

  getUNCDuke(teams: Team[]): void{
    for (var team of teams) {
      if (team.team_name == "North Carolina") {
        this.unc = team;
      }else if (team.team_name == "Duke")
      this.duke = team;
    }
  }

  ngOnInit(): void{
    this.getData();
   // this.getStreamers();
  }

}
