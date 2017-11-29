import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPageEditComponent } from './info-page-edit.component';

describe('InfoPageEditComponent', () => {
  let component: InfoPageEditComponent;
  let fixture: ComponentFixture<InfoPageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
