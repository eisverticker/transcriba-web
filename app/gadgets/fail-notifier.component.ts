import { Component, Input } from '@angular/core';

@Component({
  moduleId:     module.id,
  selector:    'ut-fail-notifier',
  template: `
  <div *ngIf="activated" class="alert  alert-danger">
      <strong>{{ 'request.fail' | translate }}</strong> {{ 'command.pleaseTryAgain' | translate }}
  </div>
  `,
  styleUrls: []
})
export class FailNotifierComponent {
  @Input() activated: boolean;
}
