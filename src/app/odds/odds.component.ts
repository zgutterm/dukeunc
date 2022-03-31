import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { MarchMadness, Team } from '../marchmadness';
import { OddsService } from '../odds.service';
import * as confetti from 'canvas-confetti';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-odds',
  templateUrl: './odds.component.html',
  styleUrls: ['./odds.component.css']
})

export class OddsComponent implements OnInit {
  
  @ViewChild('uncLogo', { static: false }) div1: ElementRef;
  
  teams: Team[] = [];
  unc: Team;
  duke: Team;
  liveWinner: string;
  marchmadness: MarchMadness;
  size = window.innerWidth - 50;

  public surprise(): void {
    var end = Date.now() + (60 * 1000);
    var colors = ['#4B9CD3', '#ffffff'];

    const canvas = this.renderer2.createElement('canvas');
    // const confettidiv = this.renderer2.createElement('div');
    // this.renderer2.appendChild(confettidiv, canvas)
    // this.renderer2.appendChild(this.elementRef.nativeElement, confettidiv);

    const myConfetti = confetti.create(canvas, {
      //resize: true, // will fit all screen sizes
      useWorker: true
    });

    (function frame() {
  myConfetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors
  });
  myConfetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}());

  }
  constructor(private oddsService: OddsService,  private renderer2: Renderer2,
    private elementRef: ElementRef) { 
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
        this.resizeGauge();
      });

  }
  findWinner(): void{
    var uncwinpct = this.unc.rd6_win;
    if (uncwinpct > .50) {
      this.liveWinner = "UNC";
    } else if (uncwinpct < .50) {
      this.liveWinner = "DUKE";
    }else {
      this.liveWinner = "EVEN"
    }

  }

  resizeGauge() {
    if (window.innerWidth <=600){
      this.size=250;
    }else if(window.innerWidth>600 && window.innerWidth<= 1000) {
      this.size = 350;
    }else {
      this.size = 450;
    }
  }

  getTeams(mmdata: MarchMadness): void{
    this.teams = mmdata.forecasts.mens['current_run'].teams
    this.getUNCDuke(this.teams);
    this.findWinner();
    this.surprise();

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
