import { Component, Input} from '@angular/core';

import { ControlValueAccessor } from '@angular/forms';

import { TeiElement } from './tei-element';


export class TeiBase implements ControlValueAccessor{

  private propagateChange: (value: any) => void = (value) => {};

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: (value: any) => void = (value) => {};

  public tei: any = new TeiElement('page', {}, []);

  constructor(){}


  /* ngModel (ControlValueAccessor) */
  writeValue(value: any) : void {
    if(value !== null && value !== undefined){
      this.tei = value;
    }
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
