import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector:    'inline-spinner',
  template: `
    <i *ngIf="active" class="fa fa-spinner fa-spin" aria-hidden="true"></i>
  `,
  styleUrls: []
})
export class InlineSpinnerComponent implements OnInit{
  @Input() active: boolean = false;

  constructor(){}

  ngOnInit(){}

}
