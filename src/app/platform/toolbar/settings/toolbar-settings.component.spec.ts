import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarSettingsComponent } from './toolbar-settings.component';

describe('ToolbarSettingsComponent', () => {
  let component: ToolbarSettingsComponent;
  let fixture: ComponentFixture<ToolbarSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
