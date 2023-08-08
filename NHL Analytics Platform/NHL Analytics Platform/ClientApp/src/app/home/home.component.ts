import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public players: Player[] = [];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Player[]>(baseUrl + 'player').subscribe(result => {
      this.players = result;
    }, error => console.error(error));
  }
}
interface Player {
  id: number,
  name: string,
  capHit: number
}

