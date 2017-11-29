import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalButtonComponent } from './critical-button.component';

describe('CriticalButtonComponent', () => {
  let component: CriticalButtonComponent;
  let fixture: ComponentFixture<CriticalButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticalButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
