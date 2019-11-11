import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowingTextareaComponent } from './growing-textarea.component';
import { By } from '@angular/platform-browser';

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

  it('should pass value to internal textarea', () => {
    component.value = 'expected value';
    fixture.detectChanges();
    const textarea = fixture.debugElement.query(By.css('textarea'));
    expect(textarea.nativeElement.textContent).toBe('expected value');
  });
});
