import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageService } from '@app/common';
import { Movie } from '@app/models';
import { MovieService } from '@app/movie';
@Component({
  selector: 'admin-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss']
})
export class PosterComponent implements OnInit {
  @Input() movie: Movie;
  @Output() remove = new EventEmitter<string>();

  constructor(
    public imageService: ImageService,
    public movieService: MovieService
  ) { }

  ngOnInit(): void {
  }
}
