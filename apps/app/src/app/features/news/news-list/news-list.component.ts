import { Component, OnInit } from '@angular/core';
import { News } from '../../../core/models/news';
import { NewsService } from '../../../core/services/news.service';
import { ImageService } from '@app/common';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss', '../news-common.scss']
})
export class NewsListComponent implements OnInit {

  public news: News[];

  constructor(
    private newsService: NewsService,
    public imageService: ImageService) { }

  ngOnInit(): void {
    this.newsService.getAllNews().subscribe((news: News[]) => {
      this.news = news;
    });
  }
}
