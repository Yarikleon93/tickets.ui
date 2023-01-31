import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '@app/common';
import { FormManager } from '@app/form-manager';
import { News, NewsService } from '@app/news';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

const MAX_TITLE_LENGTH = 48;
const MAX_SUBTITLE_LENGTH = 72;
const MAX_TEXT_LENGTH = 65535;

@Component({
  selector: 'app-news-editor',
  templateUrl: './news-editor.component.html',
  styleUrls: ['./news-editor.component.scss']
})
export class NewsEditorComponent implements OnInit, OnDestroy {

  public news: News;
  public images: (ArrayBuffer | string)[];
  public mouseEventTimeoutId: number | null;
  private destroy$ = new Subject();

  constructor(
    public imageService: ImageService,
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {
    this.images = [];
  }

  public form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(MAX_TITLE_LENGTH)]],
    subtitle: ['', [Validators.required, Validators.maxLength(MAX_SUBTITLE_LENGTH)]],
    description: ['', [Validators.required, Validators.maxLength(MAX_TEXT_LENGTH)]],
  });

  public readonly formManager = new FormManager(this.form);

  ngOnInit(): void {
    this.activatedRoute.parent.queryParamMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => {
          const newsId = params.get('newsId');
          return newsId ? this.newsService.getNews(newsId) : of(null);
        }),
      ).subscribe((news: News) => {
        this.news = news;
        if (!this.news) { return; }
        this.form.patchValue({
          title: this.news.title,
          subtitle: this.news.subtitle,
          description: this.news.description
        });
        this.images = this.news.images.map(v => v.url);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    if (!this.form.valid || !this.images.length) { return; }
    if (this.news) {
      this.newsService.updateNews(this.news.id, { ...this.form.value, images: this.images }).subscribe(() => {
        this.toastr.success(
          ' ',
          this.translateService.instant('ADMIN.NOTIFICATIONS.SUCCESS.UPDATE')
        );
        this.router.navigate(['/news']);
      });
    } else {
      this.newsService.createNews({ ...this.form.value, images: this.images }).subscribe(() => {
        this.toastr.success(
          ' ',
          this.translateService.instant('ADMIN.NOTIFICATIONS.SUCCESS.CREATE')
        );
        this.router.navigate(['/news']);
      });
    }
  }

  public uploadImages(files: File[]): void {
    if (!files.length || files[0].type.match(/image\/*/) === null) {
      return;
    }
    Object.keys(files).forEach(async (id) => {
      const reader = new FileReader();
      reader.readAsDataURL(files[id]);
      reader.onload = () => {
        this.images.push(reader.result);
      };
    });
  }


  public removeOnMouseDown(id: number): void {
    this.mouseEventTimeoutId = !this.mouseEventTimeoutId && window.setTimeout(() => {
      this.removeImage(id);
    }, 1000);
  }

  public removeOnMouseUp(): void {
    clearTimeout(this.mouseEventTimeoutId);
    this.mouseEventTimeoutId = null;
  }

  public removeImage(id: number): void {
    this.mouseEventTimeoutId && this.images.splice(id, 1);
  }

  public getSource(image: string): string | SafeUrl {
    if (/;base64/.test(image)) { return image; }
    return this.imageService.getPath(image);
  }
}
