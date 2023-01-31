import { Component, OnInit } from '@angular/core';
import { Movie, Session } from '@app/models';
import { MovieService } from '@app/movie';
import { ScheduleDay } from '../../../core/models/schedule-day';
import { SessionService } from './../../../core/services/session.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  public sessions: Session[];
  public movies: Movie[];
  public selectedSessions = [];

  constructor(private sessionService: SessionService, private movieService: MovieService) { }

  ngOnInit(): void {
    this.sessionService.getSessions({ isActual: true }).subscribe((sessions: Session[]) => {
      this.sessions = sessions;
    });
  }

  public onScheduleDay(scheduleDay: ScheduleDay): void {
    this.movieService.getMovies({ includeSessions: true, date: scheduleDay.date, isActual: true })
      .subscribe((movies: Movie[]) => {
        this.movies = movies;
      });
  }

}
