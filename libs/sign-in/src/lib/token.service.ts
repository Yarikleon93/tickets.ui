import { Injectable } from '@angular/core';
import { DecodedToken } from '@app/models';
import jwt_decode from 'jwt-decode';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(
    private cookieService: CookieService,
  ) { }

  public tokendecoding(token: string): DecodedToken {
    return jwt_decode(token);
  }

  public get userId(): string {
    if (!this.token) {
      return null;
    }
    return this.tokendecoding(this.token).userId;
  }

  public set token(value: string) {
    this.cookieService.set('userToken', value);
  }

  public get token(): string {
    return this.cookieService.get('userToken');
  }

  public removeToken(): void {
    this.cookieService.remove('userToken');
  }
}
