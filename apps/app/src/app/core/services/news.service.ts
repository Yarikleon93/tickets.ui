import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { convertToHttpParams, handleErrorResponse } from '@app/utils';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { News } from '../models/news';

const newsApiRequest = environment.API.news;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) { }

  public getTopNews(top: number): Observable<News[]> {
    const params = convertToHttpParams({ top });
    return this.http.get<News[]>(`${newsApiRequest}`, { params }).pipe(
      tap<News[]>({ error: handleErrorResponse }));
  }

  public getAllNews(config = {}): Observable<News[]> {
    const params = convertToHttpParams(config);
    return this.http.get<News[]>(`${newsApiRequest}`, { params });
  }

  public getNews(id: string): Observable<News> {
    return this.http.get<News>(`${newsApiRequest}/${id}`);
  }
}
