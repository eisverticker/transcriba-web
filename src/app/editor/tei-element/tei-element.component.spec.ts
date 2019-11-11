import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeiElementComponent } from './tei-element.component';

describe('TeiElementComponent', () => {
  let component: TeiElementComponent;
  let fixture: ComponentFixture<TeiElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeiElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeiElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
