import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tui-fail-indicator',
  templateUrl: './fail-indicator.component.html',
  styleUrls: ['./fail-indicator.component.scss']
})
export class FailIndicatorComponent implements OnInit {
  @Input() activated: boolean;

  constructor() { }

  ngOnInit() {
  }

}
