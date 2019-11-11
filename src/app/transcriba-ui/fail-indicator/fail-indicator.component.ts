import { Component, Input } from '@angular/core';

@Component({
  selector: 'tui-fail-indicator',
  templateUrl: './fail-indicator.component.html',
  styleUrls: ['./fail-indicator.component.scss']
})
export class FailIndicatorComponent {
  @Input() activated: boolean;

  constructor() { }

}
