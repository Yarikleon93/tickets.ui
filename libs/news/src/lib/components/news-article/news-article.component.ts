import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from '@app/common';
import { News } from '../../models/news';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss']
})
export class NewsArticleComponent implements OnInit {

  @Input() news: News;

  constructor(
    public imageService: ImageService) { }

  ngOnInit(): void {
  }

}
