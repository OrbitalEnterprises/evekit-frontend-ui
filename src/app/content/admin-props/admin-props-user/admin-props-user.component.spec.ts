import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPropsUserComponent } from './admin-props-user.component';

describe('AdminPropsUserComponent', () => {
  let component: AdminPropsUserComponent;
  let fixture: ComponentFixture<AdminPropsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPropsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPropsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
