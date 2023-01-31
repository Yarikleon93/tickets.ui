import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { KinoFormElement } from '@app/form-manager';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})

export class InputComponent extends KinoFormElement<string> {

  @Input() id: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() src: string;
  @Input() error: boolean;
  @Input() min: any;
  @Input() max: any;

  constructor() {
    super();
  }

  public up(): void {
    const temp = +this.value + 1;
    this.value = String(this.max && temp > this.max ? this.max : temp);
  }

  public down(): void {
    const temp = +this.value - 1;
    this.value = String(this.min && temp < this.min ? this.min : temp);
  }
}
