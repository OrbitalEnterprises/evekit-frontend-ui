import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccessKeyDialogComponent } from './edit-access-key-dialog.component';

describe('CreateAccessKeyDialogComponent', () => {
  let component: EditAccessKeyDialogComponent;
  let fixture: ComponentFixture<EditAccessKeyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAccessKeyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccessKeyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
