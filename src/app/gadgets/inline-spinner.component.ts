import { Component, Input } from '@angular/core';

@Component({
  selector:    'ut-inline-spinner',
  template: `
    <i *ngIf="active" class="fa fa-spinner fa-spin" aria-hidden="true"></i>
  `,
  styleUrls: []
})
export class InlineSpinnerComponent {
  @Input() active = false;
}
