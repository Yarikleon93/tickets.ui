import {
  Component,
  EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges
} from '@angular/core';
import { EditorsSeat } from '@app/hall';
import { range } from 'lodash';
import { seatAnimation } from './seat-animation';


@Component({
  selector: 'admin-hallschema-editor',
  templateUrl: './hallschema-editor.component.html',
  styleUrls: ['./hallschema-editor.component.scss'],
  animations: [seatAnimation]
})
export class HallschemaEditorComponent implements OnInit, OnChanges {

  @Input() rowsAmount: number;
  @Input() colsAmount: number;
  @Input() isMutable: boolean;
  @Output() hallChange = new EventEmitter<EditorsSeat[][]>();

  public gridStyles = {};

  public seatsData: EditorsSeat[][];
  public rowNumbers: number[];

  constructor() {
    this.seatsData = [];
    this.rowNumbers = [];
  }

  ngOnChanges({ rowsAmount, colsAmount }: SimpleChanges): void {
    if ((rowsAmount || colsAmount) && this.rowsAmount && this.colsAmount) {
      this.generateSchema();
    }
  }

  ngOnInit(): void { }

  public generateSchema(): void {
    this.gridStyles = {
      gridTemplateColumns: `repeat(${+this.colsAmount + 1}, 1fr)`,
      gridTemplateRows: `repeat(${this.rowsAmount}, 1fr)`,
    };
    this.fillHall();
  }

  public range(len: number): number[] {
    return range(len);
  }

  public change(row: number, col: number): void {
    let place = 1;
    const currentSeat = this.seatsData[row][col];
    currentSeat.isDisabled = !currentSeat.isDisabled;
    this.checkRow(row);
    this.seatsData[row].forEach((seat) => {
      place += seat.isDisabled ? 0 : 1;
      seat.place = place - 1;
      seat.row = this.rowNumbers[row];
    });
    this.hallChange.emit(this.seatsData);
  }

  public seatId(i: number, j: number): string {
    return `seat-${i}-${j}`;
  }

  public trackBySeat(row: number): (col: number, item: number) => EditorsSeat {
    return (col: number, item: number) => {
      return this.seatsData[row][col];
    };
  }

  private fillHall(): void {
    this.seatsData = [];
    this.rowNumbers = [];
    range(this.rowsAmount).forEach(i => {
      const row = [];
      this.rowNumbers.push(i + 1);
      for (const j of range(this.colsAmount)) {
        row.push({
          colPosition: j + 1,
          rowPosition: i + 1,
          place: j + 1,
          row: this.rowNumbers[i],
          isDisabled: false
        });
      }
      this.seatsData.push(row);
    });
    this.hallChange.emit(this.seatsData);
  }

  private checkRow(row: number): void {
    const rowIsEmpty = !this.seatsData[row].some(v => !v.isDisabled);
    rowIsEmpty && (this.rowNumbers[row] = null);

    this.rowNumbers.reduce((acc, curr, id) => {
      let currentValue = acc + (this.rowNumbers[id] && 1) ?? 0;
      curr && (this.rowNumbers[id] = currentValue);
      if (id === row && !rowIsEmpty && !curr) {
        this.rowNumbers[id] = ++currentValue;
      }
      return currentValue;
    }, 0);
  }
}
