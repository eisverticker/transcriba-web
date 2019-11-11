import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPageViewerComponent } from './info-page-viewer.component';

describe('InfoPageViewerComponent', () => {
  let component: InfoPageViewerComponent;
  let fixture: ComponentFixture<InfoPageViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPageViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
