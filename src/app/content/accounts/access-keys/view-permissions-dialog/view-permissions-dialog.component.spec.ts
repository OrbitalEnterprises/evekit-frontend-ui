import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPermissionsDialogComponent } from './view-permissions-dialog.component';

describe('ViewPermissionsDialogComponent', () => {
  let component: ViewPermissionsDialogComponent;
  let fixture: ComponentFixture<ViewPermissionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPermissionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPermissionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
