import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormManager } from '@app/form-manager';
import { KinoFormValidators } from '@app/utils';
import { HallConstructorService } from './../hall-constructor.service';

@Component({
  selector: 'admin-structure-form',
  templateUrl: './structure-form.component.html',
  styleUrls: ['./structure-form.component.scss']
})
export class StructureFormComponent {

  public readonly maxHallSize = 50;

  public form = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(64)]],
    rows: [null, [Validators.required, KinoFormValidators.number(1, this.maxHallSize)]],
    cols: [null, [Validators.required, KinoFormValidators.number(1, this.maxHallSize)]],
  });

  public readonly formManager = new FormManager(this.form);

  constructor(
    private fb: FormBuilder,
    private hallConstructorService: HallConstructorService,
  ) { }

  public onSubmit(): void {
    this.hallConstructorService.hallInfo = this.form.value;
  }
}
