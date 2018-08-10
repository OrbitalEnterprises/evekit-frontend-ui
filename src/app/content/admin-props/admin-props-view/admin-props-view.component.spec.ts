import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPropsViewComponent } from './admin-props-view.component';

describe('AdminPropsViewComponent', () => {
  let component: AdminPropsViewComponent;
  let fixture: ComponentFixture<AdminPropsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPropsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPropsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
