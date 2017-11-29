import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeiContainerComponent } from './tei-container.component';

describe('TeiContainerComponent', () => {
  let component: TeiContainerComponent;
  let fixture: ComponentFixture<TeiContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeiContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeiContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
