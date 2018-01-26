import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceMetadataComponent } from './source-metadata.component';

describe('SourceMetadataComponent', () => {
  let component: SourceMetadataComponent;
  let fixture: ComponentFixture<SourceMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
