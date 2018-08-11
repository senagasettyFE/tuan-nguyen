import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketShareOverTimeWidgetComponent } from './market-share-over-time-widget.component';

describe('MarketShareOverTimeWidgetComponent', () => {
  let component: MarketShareOverTimeWidgetComponent;
  let fixture: ComponentFixture<MarketShareOverTimeWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketShareOverTimeWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketShareOverTimeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
