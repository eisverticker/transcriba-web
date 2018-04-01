import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { LayoutType } from './layout-type.enum';

@Injectable()
export class AppService {
  public layout: Observable<LayoutType>;
  private layoutSubject: BehaviorSubject<LayoutType>;

  constructor() {
    // Initalize Observables
    this.layoutSubject = new BehaviorSubject(LayoutType.fixed);
    this.layout = this.layoutSubject.asObservable();
  }

  setLayoutType(type: LayoutType) {
    this.layoutSubject.next(type);
  }

  resetLayout() {
    this.layoutSubject.next(LayoutType.fixed);
  }

}
