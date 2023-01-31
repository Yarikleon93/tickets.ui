import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '@app/models';
import { convertToHttpParams, handleErrorResponse } from '@app/utils';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from './../../../environment/src/lib/environment';


const movieApiRequest = environment.API.movie;

@Injectable()
export class MovieService {
  constructor(
    private http: HttpClient
  ) { }

  public getMovie(id: string, config = {}): Observable<Movie> {
    const params = convertToHttpParams(config);
    return this.http.get<Movie>(`${movieApiRequest}/${id}`, { params }).pipe(
      tap<Movie>({ error: handleErrorResponse }));
  }

  public getMovies(config = {}): Observable<Movie[]> {
    const params = convertToHttpParams(config);
    return this.http.get<Movie[]>(`${movieApiRequest}`, { params }).pipe(
      tap<Movie[]>({ error: handleErrorResponse }));
  }

  public updateMovie(id: string, data): Observable<void> {
    return this.http.put<void>(`${movieApiRequest}/${id}`, data);
  }

  public addMovie(data): Observable<Movie> {
    return this.http.post<Movie>(`${movieApiRequest}`, data);
  }

  public deleteMovie(id: string): Observable<void> {
    return this.http.delete<void>(`${movieApiRequest}/${id}`);
  }
}
