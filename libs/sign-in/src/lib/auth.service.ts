import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@app/environment';
import { LoginData, LoginResponse } from '@app/models';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { CurrentUserService } from './curren-user.service';
import { TokenService } from './token.service';

const authApi = environment.API.auth;

@Injectable()
export class AuthService {
  private url = window.location.href;
  public succesfullSignIn$ = new Subject();
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
    private currentUserService: CurrentUserService
  ) { }
  public register(registerData: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${authApi}/register`, registerData);
  }

  public login(loginData: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${authApi}/login`, loginData).pipe(
      tap((data: LoginResponse) => {
        this.tokenService.token = data.token;
        this.currentUserService.getUser().subscribe();
        this.succesfullSignIn$.next();
      })
    );
  }

  public logout(): void {
    this.tokenService.removeToken();
    this.router.navigate(['/auth']);
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public getToken(): string {
    return this.tokenService.token;
  }

}
