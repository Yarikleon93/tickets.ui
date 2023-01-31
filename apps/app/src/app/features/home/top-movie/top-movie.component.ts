import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Slider } from '@app/ui/components/ui-elements';
import { ImageService } from '@app/common';
import { MovieBanner } from './../../../core/models/movie-banner';

const animations = [
  trigger('sliderAnimation', [
    transition('void => *', [
      style({ opacity: 0 }),
      animate('750ms ease-in', style({ opacity: 1 }))
    ]),
    transition('* => void', [
      animate('750ms ease-out', style({ opacity: 0 }))
    ])
  ])
];

@Component({
  selector: 'app-top-movie',
  templateUrl: './top-movie.component.html',
  styleUrls: ['./top-movie.component.scss'],
  animations
})
export class TopMovieComponent implements OnChanges {

  @Input() banners: MovieBanner[];
  public slider = new Slider();

  constructor(public imageService: ImageService) {
    this.slider.animationInterval = 15000;
  }

  ngOnChanges({ banners }: SimpleChanges): void {
    if (banners && banners.currentValue) {
      this.slider.initInterval(this.banners.length);
    }
  }

  public next(): void {
    this.slider.currentSlide = (this.slider.currentSlide + 1) % this.banners.length;
    this.slider.initInterval(this.banners.length);
  }

  public prev(): void {
    this.slider.currentSlide = (this.slider.currentSlide > 0 ?
      this.slider.currentSlide :
      this.banners.length) - 1;
    this.slider.initInterval(this.banners.length);
  }

}
