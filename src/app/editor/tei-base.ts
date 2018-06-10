import { ControlValueAccessor } from '@angular/forms';

import { TeiElement } from './tei-element';


export abstract class TeiBase implements ControlValueAccessor {

  public tei: any = new TeiElement('page', {}, []);

  /* ngModel (ControlValueAccessor) */
  writeValue(value: any): void {
    if (value !== null && value !== undefined) {
      this.tei = value;
    }
  }

  registerOnChange(fn: any): void {
    //
  }

  setDisabledState(isDisabled: boolean): void {
    // empty
  }

  registerOnTouched(fn: any) {
    //
  }


}
