import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private cookieStore = {};

  constructor() {
    this.parseCookies();
  }

  public parseCookies(): void {
    this.cookieStore = {};
    const cookies = document.cookie;

    if (!cookies) {
      return;
    }

    cookies.split(';').map((value) => {
      const keyValue = value.split('=');
      this.cookieStore[keyValue[0].trim()] = keyValue[1];
    });
  }

  get(key: string): string {
    this.parseCookies();
    return !!this.cookieStore[key] ? this.cookieStore[key] : null;
  }

  remove(key: string): void {
    document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  set(key: string, value: string): void {
    document.cookie = key + '=' + (value || '');
  }

}
