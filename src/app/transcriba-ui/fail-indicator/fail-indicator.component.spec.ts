import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailIndicatorComponent } from './fail-indicator.component';

describe('FailIndicatorComponent', () => {
  let component: FailIndicatorComponent;
  let fixture: ComponentFixture<FailIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
