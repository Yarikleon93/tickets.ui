import { ControlValueAccessor } from '@angular/forms';

export class KinoFormElement<T> implements ControlValueAccessor {
  private _value: T;
  public disabled: boolean;

  public set value(newValue: T) {
    this._value = newValue;
    this.onChange(newValue);
    this.onTouched();
  }

  public get value(): T {
    return this._value;
  }

  public onChange = (value: any) => { };
  public onTouched = () => { };

  constructor() { }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  public writeValue(value: T): void {
    this.value = value;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
