import { Seat } from '@app/hall';

export interface SelectedSeat extends Seat {
  price: number;
}
