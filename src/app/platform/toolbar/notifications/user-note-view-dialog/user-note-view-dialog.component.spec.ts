import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNoteViewDialogComponent } from './user-note-view-dialog.component';

describe('UserNoteViewDialogComponent', () => {
  let component: UserNoteViewDialogComponent;
  let fixture: ComponentFixture<UserNoteViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNoteViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNoteViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
