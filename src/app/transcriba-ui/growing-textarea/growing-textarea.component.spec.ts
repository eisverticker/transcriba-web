import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowingTextareaComponent } from './growing-textarea.component';

describe('GrowingTextareaComponent', () => {
  let component: GrowingTextareaComponent;
  let fixture: ComponentFixture<GrowingTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowingTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowingTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
