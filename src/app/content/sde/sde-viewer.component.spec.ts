import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdeViewerComponent } from './sde-viewer.component';

describe('SdeViewerComponent', () => {
  let component: SdeViewerComponent;
  let fixture: ComponentFixture<SdeViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdeViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdeViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
