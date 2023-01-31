import { BaseEntity } from '@app/models';
import { Session } from './session';

export interface Movie extends BaseEntity {
  name: string;
  description: string;
  previewUrl: string;
  frameUrl: string;
  type: number;
  duration: number;
  startRental: string;
  endRental: string;
  posterUrl: string;
  trailerYTvideoId?: string;
  sessions?: Session[];
}
