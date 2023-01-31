import { BaseEntity } from '@app/models';

export interface Bonuse extends BaseEntity {
  name: string;
  image: string;
  total: number;
}
