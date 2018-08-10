import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSyncViewComponent } from './admin-sync-view.component';

describe('AdminSyncViewComponent', () => {
  let component: AdminSyncViewComponent;
  let fixture: ComponentFixture<AdminSyncViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSyncViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSyncViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
