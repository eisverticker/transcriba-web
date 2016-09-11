import { Component, OnChanges, Input} from '@angular/core';

@Component({
  moduleId:     module.id,
  selector:    'fail-notifier',
  template: `
  <div *ngIf="activated" class="alert  alert-danger">
      <strong>{{ 'request.fail' | translate }}</strong> {{ 'command.pleaseTryAgain' | translate }}
  </div>
  `,
  styleUrls: []
})
export class FailNotifierComponent implements OnChanges{
  @Input() activated: boolean;

  constructor(){}

  ngOnChanges(){

  }

}
