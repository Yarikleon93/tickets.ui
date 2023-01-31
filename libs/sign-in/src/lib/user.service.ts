import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environment';
import { User } from '@app/models';
import { Observable } from 'rxjs';

const movieApiRequest = environment.API.users;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  public getUser(id: string): Observable<User> {
    return this.http.get<User>(`${movieApiRequest}/${id}`);
  }

  public updateUser(data): Observable<void> {
    return this.http.put<void>(`${movieApiRequest}`, data);
  }

}
