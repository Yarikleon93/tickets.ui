import { BaseEntity } from '@app/models';

export interface News extends BaseEntity {
  title: string;
  subtitle: string;
  description: string;
  images: { url: string }[];
}
