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
    this.getData();
    this.sortByDefault();
  }
  RoundVal(e : any) {
    return Math.floor(e as number * 100)/100;
  }
  sortByDefault() {
    this.players.sort(function (a, b) {
      return a[2] > b[2] ? -1 : 1;
    })
  }
  sortBy(e: Event) {
    const idx = (e.target as HTMLElement)?.getAttribute('data-index') as string;
    const state = (e.target as HTMLElement)?.getAttribute('data-state') as string;
    let twoArr = [[]];
    this.players.forEach(p => {
      twoArr.push(p.split(','));
    });
    if (!idx.includes('!')) {
      twoArr?.sort(function (a, b) {
        if (Number(idx) > 3) {
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
        if (!state || state == 'ASC') {
          (e.target as HTMLElement)?.setAttribute('data-state', 'DESC');
          return (a[Number(i[0])] - a[Number(i[1])]) > (b[Number(i[0])] - b[Number(i[1])]) ? -1 : 1;
        }
        else {
          (e.target as HTMLElement)?.setAttribute('data-state', 'ASC');
          return (a[Number(i[0])] - a[Number(i[1])]) < (b[Number(i[0])] - b[Number(i[1])]) ? -1 : 1;
        }
      });
    }
    this.players = [];
    twoArr.forEach((row) => {
      this.players.push(row.toString());
    });
    this.players.shift();
    const th = document.getElementsByTagName('th');
    for (var i = 0; i < th.length; i++) {
      if (th[i].getAttribute('data-index') != idx) {
        th[i].setAttribute('data-state', '');
      }
    }
  }
  public getData() {
    const pName = document.getElementById('nameInput') as HTMLInputElement;
    const team = document.getElementById('teamsList') as HTMLSelectElement;
    const situation = document.getElementById('situationList') as HTMLSelectElement;
    const minToi = (document.getElementById('toiInput') as HTMLSelectElement)?.value;
    const position = (document.getElementById('positionList') as HTMLSelectElement)?.value;
    this.getDataService.getData().subscribe(data => {
      this.players = [];
      const list = data.split('\n');
        list.forEach(e => {
          if (pName.value) {
            if ((e.split(',')[2])?.toUpperCase().includes(pName.value.toUpperCase())) {
              if (team.value) {
                if (e.split(',')[3] == team.value) {
                  if (!situation.value)
                    if (minToi) {
                      if (Number(e.split(',')[7]) >= Number(minToi)) {
                        if (position == 'F') {
                          if (e.split(',')[4] == 'L' || e.split(',')[4] == 'R' || e.split(',')[4] == 'C') {
                            this.players.push(e);
                          }
                        }
                        else if (position == e.split(',')[4]) {
                          this.players.push(e);
                        }
                        else {
                          this.players.push(e);
                        }
                      }
                    }
                    else {
                      if (position == 'F') {
                        if (e.split(',')[4] == 'L' || e.split(',')[4] == 'R' || e.split(',')[4] == 'C') {
                          this.players.push(e);
                        }
                      }
                      else if (position == e.split(',')[4]) {
                        this.players.push(e);
                      }
                      else {
                        this.players.push(e);
                      }
                    }
                  else {
                    if (situation.value == e.split(',')[5]) {
                      if (minToi) {
                        if (Number(e.split(',')[7]) >= Number(minToi)) {
                          if (position == 'F') {
                            if (e.split(',')[4] == 'L' || e.split(',')[4] == 'R' || e.split(',')[4] == 'C') {
                              this.players.push(e);
                            }
                          }
                          else if (position == e.split(',')[4]) {
                            this.players.push(e);
                          }
                          else {
                            this.players.push(e);
                          }
                        }
                      }
                      else {
                        if (position == 'F') {
                          if (e.split(',')[4] == 'L' || e.split(',')[4] == 'R' || e.split(',')[4] == 'C') {
                            this.players.push(e);
                          }
                        }
                        else if (position == e.split(',')[4]) {
                          this.players.push(e);
                        }
                        else {
                          this.players.push(e);
                        }
                      }
                    }
                  }
                }
              }
              else {
                if (!situation.value) {
                  if (minToi) {
                    if (Number(e.split(',')[7]) >= Number(minToi)) {
                      if (position == 'F') {
                        if (e.split(',')[4] == 'L' || e.split(',')[4] == 'R' || e.split(',')[4] == 'C') {
                          this.players.push(e);
                        }
                      }
                      else if (position == e.split(',')[4]) {
                        this.players.push(e);
                      }
                      else {
                        this.players.push(e);
                      }
                    }
                  }
                  else {
                    if (position == 'F') {
                      if (e.split(',')[4] == 'L' || e.split(',')[4] == 'R' || e.split(',')[4] == 'C') {
                        this.players.push(e);
                      }
                    }
                    else if (position == e.split(',')[4]) {
                      this.players.push(e);
                    }
                    else {
                      this.players.push(e);
                    }
                  }
                }
                else {
                  if (situation.value == e.split(',')[5]) {
                    if (minToi) {
                      if (Number(e.split(',')[7]) >= Number(minToi)) {
                        if (position == 'F') {
                          if (e.split(',')[4] == 'L' || e.split(',')[4] == 'R' || e.split(',')[4] == 'C') {
                            this.players.push(e);
                          }
                        }
                        else if (position == e.split(',')[4]) {
                          this.players.push(e);
                        }
                        else {
                          this.players.push(e);
                        }
                      }
                    }
                    else if (position) {
                      if (position == 'F') {
                        if (e.split(',')[4] == 'L' || e.split(',')[4] == 'R' || e.split(',')[4] == 'C') {
                          this.players.push(e);
                        }
                      }
                      else if (position == e.split(',')[4]) {
                        this.players.push(e);
                      }
                    }
                    else {
                      this.players.push(e)
                    }
                  }
                }
              }
            }

          }
          else if (team.value) {
            if (e.split(',')[3] == team.value) {
              if (!situation.value) {
                if (minToi) {
                  if (Number(e.split(',')[7]) >= Number(minToi)) {
                    if (position == 'F') {
                      if (e.split(',')[4] == 'L' || e.split(',')[4] == 'R' || e.split(',')[4] == 'C') {
                        this.players.push(e);
                      }
                    }
                    else if (position == e.split(',')[4]) {
                      this.players.push(e);
                    }
                    else {
                      this.players.push(e);
                    }
                  }
                }
                else {
                  if (position == 'F') {
                    if (e.split(',')[4] == 'L' || e.split(',')[4] == 'R' || e.split(',')[4] == 'C') {
                      this.players.push(e);
                    }
                  }
                  else if (position == e.split(',')[4]) {
                    this.players.push(e);
                  }
                  else {
                    this.players.push(e);
                  }
                }
              }
              else {
                if (situation.value == e.split(',')[5]) {
                  if (minToi) {
                    if (Number(e.split(',')[7]) >= Number(minToi)) {
                      if (position == 'F') {
                        if (e.split(',')[4] == 'L' || e.split(',')[4] == 'R' || e.split(',')[4] == 'C') {
                          this.players.push(e);
                        }
                      }
                      else if (position == e.split(',')[4]) {
                        this.players.push(e);
                      }
                      else {
                        this.players.push(e);
                      }
                    }
                  }
                  else {
                    if (position == 'F') {
                      if (e.split(',')[4] == 'L' || e.split(',')[4] == 'R' || e.split(',')[4] == 'C') {
                        this.players.push(e);
                      }
                    }
                    else if (position == e.split(',')[4]) {
                      this.players.push(e);
                    }
                    else {
                      this.players.push(e);
                    }
                  }
                }
              }
            }
          }
          else if (situation.value) {
            if (situation.value == e.split(',')[5]) {
              if (minToi) {
                if (Number(e.split(',')[7]) >= Number(minToi)) {
                  if (position == 'F') {
                    if (e.split(',')[4] == 'L' || e.split(',')[4] == 'R' || e.split(',')[4] == 'C') {
                      this.players.push(e);
                    }
                  }
                  else if (position == e.split(',')[4]) {
                    this.players.push(e);
                  }
                  else {
                    this.players.push(e);
                  }
                }
              }
              else {
                if (position == 'F') {
                  if (e.split(',')[4] == 'L' || e.split(',')[4] == 'R' || e.split(',')[4] == 'C') {
                    this.players.push(e);
                  }
                }
                else if (position == e.split(',')[4]) {
                  this.players.push(e);
                }
                else {
                  this.players.push(e);
                }
              }
            }
          }
          else if (minToi) {
            if (Number(e.split(',')[7]) >= Number(minToi)) {
              if (position == 'F') {
                if (e.split(',')[4] == 'L' || e.split(',')[4] == 'R' || e.split(',')[4] == 'C') {
                  this.players.push(e);
                }
              }
              else if (position == e.split(',')[4]) {
                this.players.push(e);
              }
              else {
                this.players.push(e);
              }
            }
          }
          else if (position) {
            if (position == 'F') {
              if (e.split(',')[4] == 'L' || e.split(',')[4] == 'R' || e.split(',')[4] == 'C') {
                this.players.push(e);
              }
            }
            else if (position == e.split(',')[4]) {
              this.players.push(e);
            }
          }
          else {
            if (e.split(',')[7] != 'icetime')
              this.players.push(e);
          }
        });
      this.sortByDefault();
      });
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

