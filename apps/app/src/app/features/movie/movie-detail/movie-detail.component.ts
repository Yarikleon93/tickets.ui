import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '@app/common';
import { Movie, Session } from '@app/models';
import { MovieService } from '@app/movie';
import { TranslateService } from '@ngx-translate/core';
import produce from 'immer';
import { isNil } from 'lodash';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { finalize, switchMap, take, takeUntil } from 'rxjs/operators';
import { ScheduleDay } from '../../../core/models/schedule-day';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})

export class MovieDetailComponent implements OnInit, OnDestroy {

  public playerHasAutoplay = false;
  public movie: Movie;
  public isLoading = true;
  public selectedMovie: Movie = null;
  public isDatePickerOpened = false;
  public selectedSession: Session;

  constructor(
    private activateRoute: ActivatedRoute,
    private movieService: MovieService,
    public imageService: ImageService,
    private router: Router,
    private toastrService: ToastrService,
    private translateService: TranslateService
  ) { }

  private destroy$ = new Subject();
  ngOnInit(): void {
    const observable = this.activateRoute.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap((paramMap) => {
        return this.movieService.getMovie(paramMap.get('id'), { includeSessions: true, isActual: true });
      }));
    observable.pipe(take(1), finalize(() => {
      this.isLoading = false;
    })).subscribe();
    observable.subscribe((movie: Movie) => {
      if (isNil(movie)) {
        this.toastrService.success(
          ' ',
          this.translateService.instant('NOTIFICATIONS.MOVIE_NOTFOUNT')
        );
        this.router.navigate(['/home']);
      }
      this.movie = movie;
      this.isDatePickerOpened = false;
    });

    this.activateRoute.queryParamMap.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      this.playerHasAutoplay = !!params.get('hasAutoplay');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onScheduleDay(date: ScheduleDay): void {
    this.selectedSession = null;
    this.selectedMovie = produce(this.movie, draft => {
      return {
        ...this.movie,
        sessions: this.movie.sessions.filter(session => moment(session.date).isSame(moment(date.date), 'day'))
      };
    });
  }

}
