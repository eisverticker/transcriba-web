import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'growing-textarea',
  template:
  `
    <textarea [(ngModel)]="value"></textarea>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrowingTextareaComponent),
      multi: true
    }
  ]
})
export class GrowingTextareaComponent {

  constructor(){}


  private propagateChange: (value: any) => void = (value) => {};

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: (value: any) => void = (value) => {};

  private _value: string = "";

  get value(){
    return this._value;
  }

  set value(value: any){
    if (value !== this._value) {
      this._value = value;
      this.propagateChange(value);
    }
  }

  /* ngModel (ControlValueAccessor) */
  writeValue(value: any) : void {
    this._value = value;
  }

  registerOnChange(fn: any) : void {
    this.propagateChange = fn;
  }

  setDisabledState(isDisabled: boolean) : void {

  }

  registerOnTouched(fn: any) {
      this.onTouchedCallback = fn;
  }

}
