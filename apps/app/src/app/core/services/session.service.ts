import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environment';
import { Session } from '@app/models';
import { convertToHttpParams, handleErrorResponse } from '@app/utils';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const sessionApiRequest = environment.API.session;

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(
    private http: HttpClient
  ) { }

  public getSessions(config = {}): Observable<Session[]> {
    const params = convertToHttpParams(config);
    return this.http.get<Session[]>(`${sessionApiRequest}`, { params }).pipe(
      tap<Session[]>({ error: handleErrorResponse }));
  }

}
