import { BaseEntity } from '@app/models';
import { Movie } from './movie';
export interface Session extends BaseEntity {
  date: Date;
  price: number;
  movieId: string;
  roomId: string;
  movie?: Movie;
}
