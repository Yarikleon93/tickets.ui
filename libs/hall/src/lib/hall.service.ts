import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environment';
import { Observable } from 'rxjs';
import { Hall } from './models/hall';
import { HallRequestData } from './models/hall-request-data';

const hallsApiRequest = environment.API.hall;

@Injectable({
  providedIn: 'root'
})
export class HallService {

  constructor(
    private http: HttpClient
  ) { }

  public createHall(hallRequestData: HallRequestData): Observable<Hall> {
    return this.http.post<Hall>(`${hallsApiRequest}`, hallRequestData);
  }

  public getHall(sessionId: string): Observable<Hall> {
    return this.http.get<Hall>(`${hallsApiRequest}/${sessionId}`);
  }

  public getHalls(): Observable<Hall[]> {
    return this.http.get<Hall[]>(`${hallsApiRequest}`);
  }
}
