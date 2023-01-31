import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import * as moment from 'moment';

export class KinoFormValidators {
  static readonly patterns = {
    // todo: use the same email validation with the API!
    email: Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    password: Validators.pattern('^[a-zA-Z0-9]*$'),
    fullName: Validators.pattern('^[a-zA-Zа-яА-Я]{3,}(?: [a-zA-Zа-яА-Я]+){0,4}$'),

  };

  static isIncorrectDate(control: AbstractControl): { [key: string]: any } | null {
    if (control.value === '') { return null; }
    return moment(control.value) < moment()
      ? null : { forbiddenName: { value: control.value } };
  }

  static comparePasswords(group: FormGroup): void {
    const confirmPaswword = group.get('confirmPassword');
    if (!confirmPaswword.errors || confirmPaswword.errors.mismatch) {
      group.get('password').value !== confirmPaswword.value
        ? confirmPaswword.setErrors({ mismatch: true })
        : confirmPaswword.setErrors(null);
    }
  }

  static number(min?: number, max?: number): ValidatorFn {
    return (control: AbstractControl) => {
      const val = Number(control.value);
      let res = null;
      if (min && val < min) {
        res = { less: true };
      }
      if (max && val > max) {
        res = { more: true };
      }
      return res;
    };
  }
}
