import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressPillsComponent } from './progress-pills.component';

describe('ProgressPillsComponent', () => {
  let component: ProgressPillsComponent;
  let fixture: ComponentFixture<ProgressPillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressPillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressPillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
