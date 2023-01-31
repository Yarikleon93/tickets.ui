import { Seat } from './seat';

export interface Hall {
  id: string;
  name: string;
  cols: number;
  rows: number;
  seats: Seat[];
}
