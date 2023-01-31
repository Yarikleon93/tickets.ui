import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Slider } from '@app/ui/components/ui-elements';
import { News } from '../../../core/models/news';
import { ImageService } from '@app/common';

const animations = [
  trigger('sliderAnimation', [
    transition('void => *', [
      style({ opacity: 0 }),
      animate('600ms ease-in', style({
        opacity: 1
      }))
    ])
  ])
];

@Component({
  selector: 'app-breaking-news',
  templateUrl: './breaking-news.component.html',
  styleUrls: ['./breaking-news.component.scss', '../ads-common.scss'],
  animations
})
export class BreakingNewsComponent implements OnChanges {

  @Input() news: News[];
  public slider = new Slider();
  private readonly ITEMS_ON_PAGE = 2;

  constructor(public imageService: ImageService) { }

  ngOnChanges({ news }: SimpleChanges): void {
    if (news && news.currentValue) {
      if (this.news.length > this.ITEMS_ON_PAGE) {
        this.slider.initInterval(this.news.length - 1);
      }
    }
  }
}
