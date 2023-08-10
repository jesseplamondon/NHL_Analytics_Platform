import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  playerData = '/assets/skaters.csv';
  constructor(private http: HttpClient) { }
  public getData() {
    return this.http.get(this.playerData, { responseType: 'text' });
  }
}
