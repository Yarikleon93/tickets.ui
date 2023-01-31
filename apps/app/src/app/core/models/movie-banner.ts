import { BaseEntity, Movie } from '@app/models';

export interface MovieBanner extends BaseEntity {
  bannerUrl: string;
  movie: Movie;
}
