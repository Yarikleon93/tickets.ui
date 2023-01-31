import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Hall, Seat } from '@app/hall';
import { Ticket } from '@app/models';
import { range } from 'lodash';

@Component({
  selector: 'app-hall-grid',
  templateUrl: './hall-grid.component.html',
  styleUrls: ['./hall-grid.component.scss']
})
export class HallGridComponent implements OnChanges {

  @Output() choiceOfSeats = new EventEmitter<Seat[]>();

  @Input() hall: Hall;

  @Input() tickets: Ticket[];

  public seats: Seat[];

  public formStyles;
  public seatsStyles;

  public form = this.fb.group({
    seats: new FormArray([])
  });

  get formSeats(): FormArray { return this.form.controls.seats as FormArray; }

  public rowsList: number[];

  constructor(
    private fb: FormBuilder,
  ) {
    this.rowsList = [];
  }

  ngOnChanges({ hall }: SimpleChanges): void {
    if (hall) {
      this.rowsList = range(hall.currentValue.rows);
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
    this.setForm(this.seats);
  }

  public change(): void {
    const selectedSeats = [];
    this.formSeats.controls.forEach((element, i) => {
      if (element.value) {
        selectedSeats.push({
          ...this.seats[i],
          price: this.tickets.find((ticket) => ticket.seatId === this.seats[i].id).price
        });
      }
    });
    this.choiceOfSeats.emit(selectedSeats);
  }

  private setForm(seats: Seat[]): void {
    this.resetForm();
    seats.forEach(element => {
      this.seatsStyles.push({
        gridColumnStart: element.colPosition,
        gridRowStart: element.rowPosition
      });
      this.formSeats.push(
        new FormControl({ value: false, disabled: element.isReserved })
      );
    });
  }

  private resetForm(): void {
    this.choiceOfSeats.emit([]);
    this.form.reset();
    this.formSeats.clear();
  }
}
