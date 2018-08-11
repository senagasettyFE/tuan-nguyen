import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisoryPageComponent } from './advisory-page.component';

describe('AdvisoryPageComponent', () => {
  let component: AdvisoryPageComponent;
  let fixture: ComponentFixture<AdvisoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisoryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
