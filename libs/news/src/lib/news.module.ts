import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NewsArticleComponent } from './components/news-article/news-article.component';
import { NewsService } from './news.service';

@NgModule({
  imports: [CommonModule],
  declarations: [NewsArticleComponent],
  exports: [NewsArticleComponent],
})
export class NewsModule {
  static forRoot(): ModuleWithProviders<NewsModule> {
    return {
      ngModule: NewsModule,
      providers: [
        NewsService,
      ]
    };
  }
}
