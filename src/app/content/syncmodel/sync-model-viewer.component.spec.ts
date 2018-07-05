import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncModelViewerComponent } from './sync-model-viewer.component';

describe('SyncModelViewerComponent', () => {
  let component: SyncModelViewerComponent;
  let fixture: ComponentFixture<SyncModelViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyncModelViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncModelViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
