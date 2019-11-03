import { Component, Input } from '@angular/core';

@Component({
  selector:    'ut-inline-spinner',
  template: `
    <fa-icon [icon]="['fas', 'spinner']" [spin]="true"></fa-icon>
  `,
  styleUrls: []
})
export class InlineSpinnerComponent {
  @Input() active = false;
}
