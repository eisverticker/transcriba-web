import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

export enum LayoutType {
  wide,
  fixed
}

@Injectable()
export class AppService{
  private layoutSubject: BehaviorSubject<LayoutType>;
  public layout: Observable<LayoutType>;

  constructor(){
    //Initalizing Reactive Components (Observables)
    this.layoutSubject = new BehaviorSubject(LayoutType.fixed);
    this.layout = this.layoutSubject.asObservable();
  }

  setLayoutType(type: LayoutType){
    this.layoutSubject.next(type);
  }

  resetLayout(){
    this.layoutSubject.next(LayoutType.fixed);
  }


}
