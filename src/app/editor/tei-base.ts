import { ControlValueAccessor } from '@angular/forms';

import { TeiElement } from './tei-element';


export class TeiBase implements ControlValueAccessor {

  public tei: any = new TeiElement('page', {}, []);

  /* ngModel (ControlValueAccessor) */
  writeValue(value: any): void {
    if (value !== null && value !== undefined) {
      this.tei = value;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // empty
  }

  registerOnTouched(fn: any) {
      this.onTouchedCallback = fn;
  }

  private propagateChange: (value: any) => void = (value) => { /* NOP */ };

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: (value: any) => void = (value) => { /* NOP */ };

}
