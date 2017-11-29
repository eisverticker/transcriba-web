import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPageManagementComponent } from './info-page-management.component';

describe('InfoPageManagementComponent', () => {
  let component: InfoPageManagementComponent;
  let fixture: ComponentFixture<InfoPageManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPageManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
