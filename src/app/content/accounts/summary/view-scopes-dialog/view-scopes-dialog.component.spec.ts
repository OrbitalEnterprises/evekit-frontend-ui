import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScopesDialogComponent } from './view-scopes-dialog.component';

describe('ViewScopesDialogComponent', () => {
  let component: ViewScopesDialogComponent;
  let fixture: ComponentFixture<ViewScopesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewScopesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewScopesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
