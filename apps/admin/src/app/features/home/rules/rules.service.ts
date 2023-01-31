import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environment';
import { Observable } from 'rxjs';

const rulesApiRequest = environment.API.rules;

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  constructor(
    private http: HttpClient
  ) { }

  public getText(): Observable<string> {
    return this.http.get<string>(`${rulesApiRequest}`);
  }

  public updateText(data: string): Observable<void> {
    return this.http.put<void>(`${rulesApiRequest}`, { data });
  }
}
