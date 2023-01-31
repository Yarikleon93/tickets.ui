import { Injectable } from '@angular/core';
import { User } from '@app/models';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { TokenService } from './token.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private _user: User;
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) { }

  public get user() {
    return this._user;
  }
  public getUser(): Observable<User> {
    if (!this.tokenService.token) return of(null);
    return this.userService.getUser(this.tokenService.userId).pipe(
      tap((user) => {
        this._user = user;
      })
    );
  }
}
