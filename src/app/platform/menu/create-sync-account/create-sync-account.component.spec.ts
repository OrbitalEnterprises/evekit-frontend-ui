import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSyncAccountComponent } from './create-sync-account.component';

describe('CreateSyncAccountComponent', () => {
  let component: CreateSyncAccountComponent;
  let fixture: ComponentFixture<CreateSyncAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSyncAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSyncAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
