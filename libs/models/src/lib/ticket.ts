import { BaseEntity } from '@app/models';
import { Seat } from './seat';
import { Session } from '@app/models';

export interface Ticket extends BaseEntity {
  userId: string;
  price: number;
  sessionId: string;
  seatId: string;
  session: Session;
  seat: Seat;
}
