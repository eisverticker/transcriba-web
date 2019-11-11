import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { BackendService } from '../../utility/backend.service';

@Component({
  selector: 'tr-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit {
  @Input() object;
  numOfStages = 3;

  constructor(
    public backend: BackendService
  ) { }

  ngOnInit() {
  }

}
