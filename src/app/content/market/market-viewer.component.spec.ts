import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketViewerComponent } from './market-viewer.component';

describe('MarketViewerComponent', () => {
  let component: MarketViewerComponent;
  let fixture: ComponentFixture<MarketViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
