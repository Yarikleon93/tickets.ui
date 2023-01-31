import { BaseEntity } from '@app/models';
export interface User extends BaseEntity {
  role: number;
  birthday?: string;
  email: string;
  fullName: string;
  bonuse: number;
}
