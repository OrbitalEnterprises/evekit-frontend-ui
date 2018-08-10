import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEsiTokenDialogComponent } from './edit-esi-token-dialog.component';

describe('EditEsiTokenDialogComponent', () => {
  let component: EditEsiTokenDialogComponent;
  let fixture: ComponentFixture<EditEsiTokenDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEsiTokenDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEsiTokenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
