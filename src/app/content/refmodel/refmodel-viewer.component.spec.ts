import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefmodelViewerComponent } from './refmodel-viewer.component';

describe('RefmodelViewerComponent', () => {
  let component: RefmodelViewerComponent;
  let fixture: ComponentFixture<RefmodelViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefmodelViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefmodelViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
