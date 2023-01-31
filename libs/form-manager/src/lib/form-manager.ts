import { FormGroup } from '@angular/forms';

export class FormManager {
  constructor(private form: FormGroup) { }

  public hasError(name: string, validationField: string): boolean {
    const control = this.form.get(name);
    return control.touched && control.errors?.[validationField];
  }

}
