import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSyncRefComponent } from './admin-sync-ref.component';

describe('AdminSyncRefComponent', () => {
  let component: AdminSyncRefComponent;
  let fixture: ComponentFixture<AdminSyncRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSyncRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSyncRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
