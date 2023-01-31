import { Component, OnInit } from '@angular/core';
import { News, NewsService } from '@app/news';
import { ModalService } from '@app/ui/components/ui-elements';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public news: News[];
  private newsIdToRemove: string;
  private arrayIndexToRemove: number;

  constructor(
    private newsService: NewsService,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.newsService.getAllNews()
      .subscribe((news: News[]) => {
        this.news = news;
      });
  }

  public openRemoveModal(id: string, newsId?: string, arrayIndex?: number): void {
    if (newsId ?? arrayIndex) {
      this.newsIdToRemove = newsId;
      this.arrayIndexToRemove = arrayIndex;
    }
    this.modalService.open(id);
  }

  public closeRemoveModal(modalId: string, result: boolean = false): void {
    result && this.remove(this.newsIdToRemove, this.arrayIndexToRemove);
    this.modalService.close(modalId);
  }

  private remove(id: string, index: number): void {
    this.newsService.deleteNews(id).subscribe(() => {
      this.news.splice(index, 1);
      this.toastr.success(
        ' ',
        this.translateService.instant('ADMIN.NOTIFICATIONS.SUCCESS.DELETE')
      );
    });
  }
}
