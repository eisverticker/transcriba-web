import {
  Component,
  OnChanges,
  Input
} from '@angular/core';

@Component({
  selector: 'tui-progress-pills',
  templateUrl: './progress-pills.component.html',
  styleUrls: ['./progress-pills.component.scss']
})
export class ProgressPillsComponent implements OnChanges {
  @Input() size: number;
  @Input() current: number;
  @Input() stageNames: Array<string>;
  private pills: Array<boolean>;

  constructor() { }

  ngOnChanges() {
    let pills = [];
    for(let i = 0; i < this.size; i++){
      pills.push(i < this.current);
    }
    this.pills = pills;
  }

}
