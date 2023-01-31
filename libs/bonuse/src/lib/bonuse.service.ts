import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environment';
import { Bonuse } from '@app/models';
import { Observable } from 'rxjs';

const bonuseApiRequest = environment.API.bonuses;

@Injectable({
  providedIn: 'root'
})
export class BonuseService {
  constructor(private http: HttpClient) { }

  public getBonuses(): Observable<Bonuse[]> {
    return this.http.get<Bonuse[]>(`${bonuseApiRequest}`);
  }

  public getBonuse(id: string): Observable<Bonuse> {
    return this.http.get<Bonuse>(`${bonuseApiRequest}/${id}`);
  }

  public updateBonuse(id: string, data): Observable<void> {
    return this.http.put<void>(`${bonuseApiRequest}/${id}`, data);
  }

  public deleteBonuse(id: string): Observable<void> {
    return this.http.delete<void>(`${bonuseApiRequest}/${id}`);
  }

  public addBonuse(data): Observable<Bonuse> {
    return this.http.post<Bonuse>(`${bonuseApiRequest}`, data);
  }
}
