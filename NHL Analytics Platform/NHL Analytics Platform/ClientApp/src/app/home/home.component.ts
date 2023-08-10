import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public players: any[] = [];
  constructor(private getDataService: GetDataService) { }
  ngOnInit() {
    this.createTeamOptions();
    this.createSituations();
  }
  RoundVal(e : any) {
    return Math.floor(e as number * 100)/100;
  }
  sortBy(e: Event) {
    const idx = (e.target as HTMLElement)?.getAttribute('data-index') as string;
    let twoArr = [[]];
    this.players.forEach(p => {
      twoArr.push(p.split(','));
    });
    if (!idx.includes('!')) {
      twoArr?.sort(function (a, b) {
        if (Number(idx) >3) {
          return Number(a[Number(idx)]) > Number(b[Number(idx)]) ? -1 : 1;
        }
        else {
          return a[Number(idx)] < b[Number(idx)] ? -1 : 1;
        }
      });
    }
    else {
      const i = idx.split('!');
      twoArr?.sort(function (a, b) {
        return (a[Number(i[0])] - a[Number(i[1])]) > (b[Number(i[0])] - b[Number(i[1])]) ? -1 : 1;
      });
    }
    this.players = [];
    twoArr.forEach((row) => {
      this.players.push(row.toString());
    });
    this.players.shift();
  }
  public getData() {
    const pName = document.getElementById('nameInput') as HTMLInputElement;
    const team = document.getElementById('teamsList') as HTMLSelectElement;
    const situation = document.getElementById('situationList') as HTMLSelectElement;
    this.getDataService.getData().subscribe(data => {
      this.players = [];
      const list = data.split('\n');
      list.forEach(e => {
        if (pName.value && (e.split(',')[2])?.toUpperCase().includes(pName.value.toUpperCase())) {
          if (team.value) {
            if (e.split(',')[3] == team.value) {
              if (!situation.value)
                this.players.push(e);
              else {
                if (situation.value == e.split(',')[5]) {
                  this.players.push(e);
                }
              }
            }
          }
          else {
            if (!situation.value)
              this.players.push(e);
            else {
              if (situation.value == e.split(',')[5]) {
                this.players.push(e);
              }
            }
          }

        }
        else if (team.value && e.split(',')[3] == team.value) {
          if (!situation.value)
            this.players.push(e);
          else {
            if (situation.value == e.split(',')[5]) {
              this.players.push(e);
            }
          }
        }
      })
    });
    let twoArr = [[]];
    this.players.forEach(p => {
      twoArr.push(p.split(','));
    });
    twoArr?.sort(function (a, b) {
      return a[2] - b[2];
    });
    this.players = [];
    twoArr.forEach((row) => {
      this.players.push(row.toString());
    });
    this.players.shift();
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
  public getPlayers(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    console.log("Getting Player");
    const pName = document.getElementById('nameInput') as HTMLInputElement;
    const team = document.getElementById('teamInput') as HTMLInputElement;
    http.get<Player[]>(baseUrl + 'player').subscribe(result => {
      result.forEach( p => {
        if ((pName.value && p.name == pName.value) && (team.value && p.team == team.value)) {
          this.players.push(p);
        }
      });
    }, error => console.error(error));
  }
}
interface Player {
  id: number,
  name: string,
  capHit: number,
  team: string
}

