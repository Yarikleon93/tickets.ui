import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '@app/common';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { News } from '../../../core/models/news';
import { NewsService } from '../../../core/services/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss', '../news-common.scss']
})
export class NewsDetailsComponent implements OnInit, OnDestroy {

  public news: News;

  constructor(
    private newsService: NewsService,
    public imageService: ImageService,
    private activateRoute: ActivatedRoute
  ) { }

  private destroy$ = new Subject();
  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap(({ id }) => this.newsService.getNews(id)),
      )
      .subscribe((news: News) => {
        this.news = news;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
