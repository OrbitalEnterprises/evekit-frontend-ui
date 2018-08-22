import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarThemeComponent } from './toolbar-theme.component';

describe('ToolbarThemeComponent', () => {
  let component: ToolbarThemeComponent;
  let fixture: ComponentFixture<ToolbarThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
