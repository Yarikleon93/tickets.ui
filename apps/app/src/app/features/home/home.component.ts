import { Component, OnInit } from '@angular/core';
import { Movie } from '@app/models';
import { MovieService } from '@app/movie';
import { MovieBanner } from '../../core/models/movie-banner';
import { News } from './../../core/models/news';
import { MovieBannerService } from './../../core/services/movie-banner.service';
import { NewsService } from './../../core/services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public moviesInRent: Movie[];
  public moviesInPreOrder: Movie[];
  public moviesInSoon: Movie[];
  public movieBanners: MovieBanner[];
  public breakingNews: News[];

  constructor(
    private movieService: MovieService,
    private newsService: NewsService,
    private movieBannerService: MovieBannerService) { }

  ngOnInit(): void {
    this.setTopMovies();
    this.setRentMovies();
    this.setPreOrderMovies();
    this.setSoonMovies();
    this.setBreakingNews();
  }

  public setTopMovies(): void {
    this.movieBannerService.getMovieBanners().subscribe((movieBanners: MovieBanner[]) => {
      this.movieBanners = movieBanners;
    });
  }

  public setRentMovies(): void {
    this.movieService.getMovies({ status: 0 }).subscribe((movies: Movie[]) => {
      this.moviesInRent = movies;
    });
  }

  public setPreOrderMovies(): void {
    this.movieService.getMovies({ status: 1 }).subscribe((movies: Movie[]) => {
      this.moviesInPreOrder = movies;
    });
  }

  public setSoonMovies(): void {
    this.movieService.getMovies({ status: 2 }).subscribe((movies: Movie[]) => {
      this.moviesInSoon = movies;
    });
  }

  public setBreakingNews(): void {
    this.newsService.getAllNews({ status: 0 }).subscribe((news: News[]) => {
      this.breakingNews = news;
    });
  }
}
