import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { handleErrorResponse } from '@app/utils';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MovieBanner } from './../models/movie-banner';

const movieBannerApiRequest = environment.API.movieBanner;

@Injectable({
  providedIn: 'root'
})
export class MovieBannerService {
  constructor(
    private http: HttpClient
  ) { }

  public getMovieBanners(): Observable<MovieBanner[]> {
    return this.http.get<MovieBanner[]>(`${movieBannerApiRequest}`).pipe(
      tap<MovieBanner[]>({ error: handleErrorResponse }));
  }
}
