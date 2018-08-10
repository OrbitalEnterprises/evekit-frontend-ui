import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersViewAccountsDialogComponent } from './admin-users-view-accounts-dialog.component';

describe('AdminUsersViewAccountsDialogComponent', () => {
  let component: AdminUsersViewAccountsDialogComponent;
  let fixture: ComponentFixture<AdminUsersViewAccountsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersViewAccountsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersViewAccountsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
