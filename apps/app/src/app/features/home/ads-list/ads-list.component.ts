import { Component, HostListener, Input } from '@angular/core';
import { Movie } from '@app/models';
import { MediaEndpoint } from '@app/ui/components/ui-elements';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.scss', '../ads-common.scss']
})
export class AdsListComponent {

  @Input() title: string;
  @Input() movies: Movie[];
  public offset = 0;
  public rowSize = 6;
  public gridTemplateColumns: string;

  get dataSource(): Movie[] {
    return this.movies?.slice(this.offset, this.offset + this.rowSize);
  }

  get isLastItem(): boolean {
    return this.movies?.length - this.offset <= this.rowSize;
  }

  constructor() { }

  public upOffset(): void {
    if (this.movies.length - this.offset > this.rowSize) {
      this.offset++;
    }
  }

  public downOffset(): void {
    if (this.offset > 0) {
      this.offset--;
    }
  }

  @HostListener('window:resize')
  public setRowSize(): void {
    const width = window.innerWidth;
    if (width <= MediaEndpoint.SMARTPHONE) {
      this.rowSize = 2;
    }
    else if (width <= MediaEndpoint.PORTRAIT) {
      this.rowSize = 3;
    }
    else if (width <= MediaEndpoint.DESKTOP) {
      this.rowSize = 4;
    }
    else {
      this.rowSize = 6;
    }
    this.gridTemplateColumns = 'repeat(' + this.rowSize + ', 1fr)';
  }

}
