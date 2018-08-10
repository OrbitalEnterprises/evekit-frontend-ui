import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSyncAccountComponent } from './admin-sync-account.component';

describe('AdminSyncAccountComponent', () => {
  let component: AdminSyncAccountComponent;
  let fixture: ComponentFixture<AdminSyncAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSyncAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSyncAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
