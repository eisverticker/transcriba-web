import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tui-inline-spinner',
  templateUrl: './inline-spinner.component.html',
  styleUrls: ['./inline-spinner.component.scss']
})
export class InlineSpinnerComponent implements OnInit {
  @Input() active = false;

  constructor() { }

  ngOnInit() {
  }

}
