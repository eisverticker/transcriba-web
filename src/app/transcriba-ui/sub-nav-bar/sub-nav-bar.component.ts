import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tui-sub-nav-bar',
  templateUrl: './sub-nav-bar.component.html',
  styleUrls: ['./sub-nav-bar.component.scss']
})
export class SubNavBarComponent implements OnInit {
  @Input() items: Array<{ name: string, route: string  }> = [];

  constructor() { }

  ngOnInit() {
  }

}
