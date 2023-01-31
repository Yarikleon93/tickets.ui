import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie, MovieStatus } from '@app/models';
import { MovieService } from '@app/movie';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/internal/operators';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  constructor(
    public router: Router,
    public movieService: MovieService,
    private activateRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private translateService: TranslateService
  ) { }
  public movieStatus = MovieStatus;
  public movies: Movie[];
  public selectValue = 0;
  private destroy$ = new Subject();

  ngOnInit(): void {
    this.router.navigate([''], { queryParams: { status: MovieStatus.IN_RENT } });
    this.activateRoute.queryParamMap.pipe(
      takeUntil(this.destroy$),
      switchMap((paramMap) => {
        const status = paramMap.get('status') ||  MovieStatus.IN_RENT;
        return this.movieService.getMovies({ status });
      })).subscribe(movies => {
        this.movies = movies;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public remove(movieId, index): void {
    this.movieService.deleteMovie(movieId).subscribe(() => {
      this.movies.splice(index, 1);
      this.toastrService.success(
        ' ',
        this.translateService.instant('ADMIN.MOVIE.MOVIE_DELETED')
      );
    });
  }

}
