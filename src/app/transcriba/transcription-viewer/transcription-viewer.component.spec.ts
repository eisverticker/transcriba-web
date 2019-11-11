import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptionViewerComponent } from './transcription-viewer.component';

describe('TranscriptionViewerComponent', () => {
  let component: TranscriptionViewerComponent;
  let fixture: ComponentFixture<TranscriptionViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptionViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
