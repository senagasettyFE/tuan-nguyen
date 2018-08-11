import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceUpdatedComponent } from './source-updated.component';

describe('SourceUpdatedComponent', () => {
  let component: SourceUpdatedComponent;
  let fixture: ComponentFixture<SourceUpdatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceUpdatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
