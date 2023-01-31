import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environment';
import { convertToHttpParams, handleErrorResponse } from '@app/utils';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { News } from './models/news';
import { NewsRequest } from './models/news-request';

const newsApiRequest = environment.API.news;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) { }

  public createNews(model: NewsRequest): Observable<void> {
    return this.http.post<void>(`${newsApiRequest}`, model);
  }

  public updateNews(id: string, model: NewsRequest): Observable<void> {
    return this.http.put<void>(`${newsApiRequest}/${id}`, model);
  }

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

  public deleteNews(id: string): Observable<void> {
    return this.http.delete<void>(`${newsApiRequest}/${id}`);
  }
}
