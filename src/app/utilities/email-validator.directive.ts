import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[utValidateEmail][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidatorDirective), multi: true }
    ]
})
export class EmailValidatorDirective implements Validator {

    validate(c: AbstractControl): { [key: string]: any } {
      const regEx = /.{2,20}@.{2,20}\..{2,5}/;

      // (!) null indicates that the value is valid
      return regEx.test(c.value) ? null : {
        validateEmail: {
          valid: false
        }
      };

    }
}
