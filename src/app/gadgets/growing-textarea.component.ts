import { Component, forwardRef, ElementRef, AfterViewInit, AfterViewChecked, ViewChild, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ut-growing-textarea',
  template:
  `
    <textarea #textfield class="growing-textarea" [(ngModel)]="value"></textarea>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrowingTextareaComponent),
      multi: true
    }
  ]
})
export class GrowingTextareaComponent implements AfterViewInit, AfterViewChecked {
   @ViewChild('textfield', { static: true }) textarea: ElementRef;

  private _value = '';
  private isViewInitialized = false;

  constructor(
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.isViewInitialized = true;
  }

  ngAfterViewChecked() {
    this.grow();
  }

  get value(){
    return this._value;
  }

  set value(value: any){
    if (value !== this._value) {
      this._value = value;
      this.propagateChange(value);
    }
  }

  grow() {
    let ta = this.textarea.nativeElement;

    if (ta.scrollHeight > ta.clientHeight) {
      ta.style.height = ta.scrollHeight + 'px';
    }
  }

  /* ngModel (ControlValueAccessor) */
  writeValue(value: any): void {
    this._value = value;
    if (this.isViewInitialized === true) {
      this.grow();
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // empty
  }

  registerOnTouched(fn: any) {
      this.propagateTouch = fn;
  }

  // default callbacks which do nothing (they are being replaced when
  //  someone binds a value to ngModel)
  private propagateChange: (value: any) => void = (value) => { /*nop*/ };
  private propagateTouch: (value: any) => void = (value) => {  /*nop*/  };

}
