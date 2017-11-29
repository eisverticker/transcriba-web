import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingSuggestionComponent } from './voting-suggestion.component';

describe('VotingSuggestionComponent', () => {
  let component: VotingSuggestionComponent;
  let fixture: ComponentFixture<VotingSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
