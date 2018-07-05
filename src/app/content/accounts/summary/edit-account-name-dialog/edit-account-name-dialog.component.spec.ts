import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountNameDialogComponent } from './edit-account-name-dialog.component';

describe('EditAccountNameDialogComponent', () => {
  let component: EditAccountNameDialogComponent;
  let fixture: ComponentFixture<EditAccountNameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAccountNameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccountNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
