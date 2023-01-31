import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '@app/common';
import { FormManager } from '@app/form-manager';
import { Movie } from '@app/models';
import { MovieService } from '@app/movie';
import { ImageManager } from '@app/utils';
import { TranslateService } from '@ngx-translate/core';
import { isEqual, omit } from 'lodash';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-movie-editor',
  templateUrl: './movie-editor.component.html',
  styleUrls: ['./movie-editor.component.scss']
})
export class MovieEditorComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    public activateRoute: ActivatedRoute,
    public movieService: MovieService,
    public imageService: ImageService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private router: Router
  ) { }

  public form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
    type: ['', [Validators.required]],
    duration: ['', [Validators.required]],
    startRental: ['', [Validators.required]],
    endRental: ['', [Validators.required]],
    trailerYTvideoId: ['', [Validators.required]],
    description: ['', [Validators.required]],
    posterUrl: [''],
    frameUrl: [''],
  });
  public isOnHoverEndRental = false;
  public isOnHoverStartRental = false;
  public readonly formManager = new FormManager(this.form);
  public posterImg: string | SafeUrl;
  public frameImg: string | SafeUrl;
  public message: string;
  public movieId: string;
  public movieFormData: Movie;
  public updatedMovieformData: Movie;
  private destroy$ = new Subject();

  ngOnInit(): void {
    this.activateRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => {
          this.movieId = params.get('id');
          return !this.movieId ? of(null) : this.movieService.getMovie(this.movieId);
        }),
      )
      .subscribe((movie: Movie) => {
        this.setMovieFormData(movie);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public previewPoster(files: File[]): void {
    ImageManager.setImg(files, (reader) => {
      return () => {
        this.posterImg = reader.result;
      };
    });
  }
  public previewFrame(files: File[]): void {
    ImageManager.setImg(files, (reader) => {
      return () => {
        this.frameImg = reader.result;
      };
    });
  }

  public onSubmit(): void {
    const updatedFormData = this.setUpdatedFormData(this.form.value);
    let frameImg = this.frameImg;
    let posterImg = this.posterImg;
    if (typeof this.frameImg === 'object') {
      frameImg = '';
    }
    if (typeof this.posterImg === 'object') {
      posterImg = '';
    }
    if (!this.movieId) {
      this.movieService.addMovie({ ...updatedFormData, frameImg, posterImg }).subscribe(() => {
        this.movieFormData = { ...updatedFormData };
        this.toastrService.success(
          ' ',
          this.translateService.instant('ADMIN.MOVIE.MOVIE_ADDED')
        );
        this.router.navigate(['/movies']);
      });
    } else if (this.isFormChanged()) {
      this.movieService.updateMovie(this.movieId, { ...updatedFormData, frameImg, posterImg }).subscribe(() => {
        this.movieFormData = { ...updatedFormData };
        this.toastrService.success(
          ' ',
          this.translateService.instant('ADMIN.MOVIE.CHANGES_SAVED')
        );
        this.router.navigate(['/movies']);
      });
    }
  }

  private setMovieFormData(movie: Movie): void {
    if (!movie) {
      return;
    }
    this.movieFormData = movie;
    this.movieFormData.startRental = moment(this.movieFormData.startRental).format('YYYY-MM-DD');
    this.movieFormData.endRental = moment(this.movieFormData.endRental).format('YYYY-MM-DD');
    this.posterImg = this.imageService.getPath(this.movieFormData.posterUrl);
    this.frameImg = this.imageService.getPath(this.movieFormData.frameUrl);
    this.form.patchValue(omit(this.movieFormData, ['posterUrl', 'frameUrl']));
  }

  private isFormChanged(): boolean {
    return !isEqual(this.movieFormData, this.updatedMovieformData);
  }

  private setUpdatedFormData(data: Movie): Movie {
    this.updatedMovieformData = data;
    if (!data.posterUrl) {
      this.updatedMovieformData.posterUrl = this.movieFormData.posterUrl;
    } else {
      this.updatedMovieformData.posterUrl = ImageManager.setUrl(data.posterUrl);
    }
    if (!data.frameUrl) {
      this.updatedMovieformData.frameUrl = this.movieFormData.frameUrl;
    } else {
      this.updatedMovieformData.frameUrl = ImageManager.setUrl(data.frameUrl);
    }
    return this.updatedMovieformData;
  }
}
