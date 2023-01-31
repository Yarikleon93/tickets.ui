import { BaseEntity } from './base-entity';

export interface Seat extends BaseEntity {
  rowPosition: number;
  colPosition: number;
  place: number;
  row: number;
  isReserved: boolean;
  status: string;
  sector?: { name: string };
}
