import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarAuthComponent } from './toolbar-auth.component';

describe('ToolbarAuthComponent', () => {
  let component: ToolbarAuthComponent;
  let fixture: ComponentFixture<ToolbarAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
