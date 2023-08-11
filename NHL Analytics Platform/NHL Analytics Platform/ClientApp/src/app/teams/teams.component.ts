import { Component } from '@angular/core';
import { GetTeamsService } from './getTeams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  public data: any[] = [];
  constructor(private getTeamsService: GetTeamsService) { }
  ngOnInit() {
    this.getData();
    this.createTeamOptions();
    this.createSituations();
    this.sortByDefault();
  }
  sortByDefault() {
    this.data.sort(function (a, b) {
      return a[0] > b[0] ? -1 : 1;
    })
  }
  createSituations() {
    const situationList = document.getElementById("situationList");
    var situations = ['all', '5on5', '5on4', '4on5', 'other'];
    situations.forEach(function (s) {
      const node = document.createElement("option");
      node.value = s;
      node.innerHTML = s;
      situationList?.appendChild(node);
    });
  }
  createTeamOptions() {
    const teamsList = document.getElementById("teamsList");
    var teams = ['Anaheim Ducks', 'Arizona Coyotes', 'Boston Bruins', 'Buffalo Sabres', 'Calgary Flames', 'Carolina Hurricanes', 'Chicago Blackhawks',
      'Colorado Avalanche', 'Columbus Blue Jackets', 'Dallas Stars', 'Detroit Red Wings', 'Edmonton Oilers', 'Florida Panthers', 'Los Angeles Kings',
      'Minnesota Wild', 'Montreal Canadiens', 'Nashville Predators', 'New Jersey Devils', 'New York Islanders', 'New York Rangers', 'Ottawa Senators',
      'Philadelphia Flyers', 'Pittsburgh Penguins', 'San Jose Sharks', 'Seattle Kraken', 'St Louis Blues', 'Tampa Bay Lightning', 'Toronto Maple Leafs',
      'Vancouver Canucks', 'Vegas Golden Knights', 'Washington Capitals', 'Winnipeg Jets'];
    var ids = ['ANA', 'ARI', 'BOS', 'BUF', 'CGY', 'CAR', 'CHI', 'COL', 'CBJ', 'DAL', 'DET', 'EDM', 'FLA', 'LAK', 'PHI', 'PIT', 'SJS', 'SEA', 'STL', 'TBL', 'TOR', 'VAN', 'VGK', 'WSH', 'WPG'];
    teams.forEach(function (t, index) {
      const node = document.createElement("option");
      node.value = ids[index];
      node.innerHTML = t;
      teamsList?.appendChild(node);
    });
  }
  public getData() {
    const team = (document.getElementById('teamsList') as HTMLSelectElement).value;
    const situation = (document.getElementById('situationList') as HTMLSelectElement).value;
    this.getTeamsService.getData().subscribe(data => {
      this.data = [];
      const list = data.split('\n');
      list.forEach(e => {
        if (team) {
          if (e.split(',')[0] == team) {
            if (situation) {
              if (e.split(',')[5] == situation) {
                this.data.push(e);
              }
            }
            else {
              this.data.push(e);
            }
          }
        }
        else if (situation) {
          if (e.split(',')[5] == situation) {
            this.data.push(e);
          }
        }
        else {
          this.data.push(e);
        }
      });
    });
    document.getElementById('teamHead')?.click();
  }
  sortBy(e: Event) {
    const idx = (e.target as HTMLElement)?.getAttribute('data-index') as string; 
    const state = (e.target as HTMLElement)?.getAttribute('data-state') as string;
    let twoArr = [[]];
    this.data.forEach(p => {
      twoArr.push(p.split(','));
    });
    if (!idx.includes('!')) {
      twoArr?.sort(function (a, b) {
        if (Number(idx) > 5) {
          if (!state || state == 'ASC') {
            (e.target as HTMLElement)?.setAttribute('data-state', 'DESC');
            return Number(a[Number(idx)]) > Number(b[Number(idx)]) ? -1 : 1;
          }
          else {
            (e.target as HTMLElement)?.setAttribute('data-state', 'ASC');
            return Number(a[Number(idx)]) < Number(b[Number(idx)]) ? -1 : 1;
          }
        }
        else {
          if (!state || state == 'ASC') {
            (e.target as HTMLElement)?.setAttribute('data-state', 'DESC');
            return a[Number(idx)] < b[Number(idx)] ? -1 : 1;
          }
          else {
            (e.target as HTMLElement)?.setAttribute('data-state', 'ASC');
            return a[Number(idx)] > b[Number(idx)] ? -1 : 1;
          }
        }
      });
    }
    else {
      const i = idx.split('!');
      twoArr?.sort(function (a, b) {
        return (a[Number(i[0])] - a[Number(i[1])]) > (b[Number(i[0])] - b[Number(i[1])]) ? -1 : 1;
      });
    }
    this.data = [];
    twoArr.forEach((row) => {
      this.data.push(row.toString());
    });
    this.data.shift();
    const th = document.getElementsByTagName('th');
    for (var i = 0; i < th.length; i++) {
      if (th[i].getAttribute('data-index') != idx) {
        th[i].setAttribute('data-state', '');
      }
    }
  }
}
