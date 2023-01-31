import { Injectable } from '@angular/core';
import { EditorsSeat, HallRequestData, Sector } from '@app/hall';

@Injectable({
  providedIn: 'root'
})
export class HallConstructorService {
  public hallInfo: { name: string, cols: number, rows: number };
  public seats: EditorsSeat[][];
  public sectors: Sector[];

  constructor() { }

  public clear(): void {
    this.hallInfo = null;
    this.seats = [];
    this.sectors = [];
  }

  public hasInfo(): boolean {
    return this.hallInfo &&
      Object.values(this.hallInfo).reduce((acc, v) => !!(acc && v), true);
  }

  public buildHall(): HallRequestData {
    this.setSectors();
    return {
      name: this.hallInfo.name,
      seats: this.seats.flat(2).filter((seat: EditorsSeat) => !seat.isDisabled).
        map((seat: EditorsSeat) => {
          return {
            rowPosition: seat.rowPosition,
            colPosition: seat.colPosition,
            place: seat.place,
            row: seat.row,
            ...(seat.sectorName ? { sectorName: seat.sectorName } : {})
          };
        })
    };
  }

  private setSectors(): void {
    if (!this.sectors) { return; }

    const activeRows = [];
    this.seats.forEach((row, index) => {
      const isEmptyRow = row.every((seat) => seat.isDisabled);
      !isEmptyRow && activeRows.push(index);
    });

    this.sectors.map((sector: Sector) => {
      for (let i = sector.from - 1; i < Math.min(activeRows[activeRows.length - 1] + 1, sector.to); i++) {
        this.seats[activeRows[i]].forEach((value: EditorsSeat) => {
          value.sectorName = sector.name;
        });
      }
    });
  }

}
