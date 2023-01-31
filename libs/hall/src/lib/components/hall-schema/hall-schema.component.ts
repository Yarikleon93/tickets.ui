import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Hall, Seat } from '@app/hall';
import { Ticket } from '@app/models';
import { range } from 'lodash';

@Component({
  selector: 'app-hall-schema',
  templateUrl: './hall-schema.component.html',
  styleUrls: ['./hall-schema.component.scss']
})
export class HallSchemaComponent implements OnChanges {

  @Input() hall: Hall;
  @Input() tickets: Ticket[];

  public seats: Seat[];

  public formStyles;
  public seatsStyles;

  public rowsList: number[];

  constructor() {
    this.rowsList = [];
  }

  ngOnChanges({ hall }: SimpleChanges): void {
    if (hall && this.hall) {
      this.rowsList = range(this.hall.rows);
      this.setHall();
    }
  }

  public setHall(): void {
    this.seats = this.hall.seats;
    this.formStyles = {
      gridTemplateColumns: `repeat(${this.hall.cols}, 1fr)`,
      gridTemplateRows: `repeat(${this.hall.rows}, 1fr)`,
    };
    this.seatsStyles = [];
    this.setSchema(this.seats);
  }

  private setSchema(seats: Seat[]): void {
    seats.forEach(element => {
      this.seatsStyles.push({
        gridColumnStart: element.colPosition,
        gridRowStart: element.rowPosition
      });
    });
  }
}
