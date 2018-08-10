import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSyncViewDialogComponent } from './admin-sync-view-dialog.component';

describe('AdminSyncViewDialogComponent', () => {
  let component: AdminSyncViewDialogComponent;
  let fixture: ComponentFixture<AdminSyncViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSyncViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSyncViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
