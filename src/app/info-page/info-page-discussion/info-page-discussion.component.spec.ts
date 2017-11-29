import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPageDiscussionComponent } from './info-page-discussion.component';

describe('InfoPageDiscussionComponent', () => {
  let component: InfoPageDiscussionComponent;
  let fixture: ComponentFixture<InfoPageDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPageDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPageDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
