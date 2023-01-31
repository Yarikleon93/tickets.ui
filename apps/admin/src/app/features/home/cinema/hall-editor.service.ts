import { Injectable } from '@angular/core';
import { Hall } from '@app/hall';

@Injectable({
  providedIn: 'root'
})
export class HallEditorService {

  public halls: Hall[];
  public selectedHall: Hall;

  constructor() { }

  public setSelectedHall(id: string): void {
    this.selectedHall = this.halls && this.halls.find((current: Hall) => current.id === id);
  }
}
