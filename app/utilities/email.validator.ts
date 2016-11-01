import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateEmail][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true }
    ]
})
export class EmailValidator implements Validator {
    constructor() {}

    validate(c: AbstractControl): { [key: string]: any } {
      let regEx = /.{2,20}@.{2,20}\..{2,5}/;

      //(!) null indicates that the value is valid
      return regEx.test(c.value) ? null :{
        validateEmail: {
          valid: false
        }
      };

    }
}
