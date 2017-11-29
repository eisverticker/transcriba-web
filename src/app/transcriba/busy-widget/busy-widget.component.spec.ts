import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusyWidgetComponent } from './busy-widget.component';

describe('BusyWidgetComponent', () => {
  let component: BusyWidgetComponent;
  let fixture: ComponentFixture<BusyWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusyWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusyWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
