import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from '@app/common';
import { Movie } from '@app/models';

@Component({
  selector: 'app-movie-poster',
  templateUrl: './movie-poster.component.html',
  styleUrls: ['./movie-poster.component.scss']
})
export class MoviePosterComponent implements OnInit {

  @Input() movie: Movie;

  constructor(public imageService: ImageService) { }

  ngOnInit(): void {
  }
}
