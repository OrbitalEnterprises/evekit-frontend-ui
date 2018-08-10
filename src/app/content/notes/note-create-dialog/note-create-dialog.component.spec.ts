import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCreateDialogComponent } from './note-create-dialog.component';

describe('NoteCreateDialogComponent', () => {
  let component: NoteCreateDialogComponent;
  let fixture: ComponentFixture<NoteCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
