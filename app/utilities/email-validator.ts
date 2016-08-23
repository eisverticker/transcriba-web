import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';

function validateEmail(c: FormControl){
  let regEx = /.{2,20}@.{2,20}\..{2,5}/;

  //(!) null indicates that the value is valid
  return regEx.test(c.value) ? null :{
    validateEmail: {
      valid: false
    }
  };
}


@Directive({
  selector: '[validateEmail][ngModel]',
  providers: [
  { provide: NG_VALIDATORS, useValue: validateEmail, multi: true }
]
})
export class EmailValidator{

}
