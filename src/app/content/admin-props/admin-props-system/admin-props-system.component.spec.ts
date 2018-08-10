import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPropsSystemComponent } from './admin-props-system.component';

describe('AdminPropsSystemComponent', () => {
  let component: AdminPropsSystemComponent;
  let fixture: ComponentFixture<AdminPropsSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPropsSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPropsSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
