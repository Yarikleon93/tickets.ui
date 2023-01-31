import { User } from './user';
export interface UserFormValue extends Omit<User, 'role'> {
}
