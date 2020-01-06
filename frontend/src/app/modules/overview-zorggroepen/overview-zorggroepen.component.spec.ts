import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewZorggroepenComponent } from './overview-zorggroepen.component';

describe('OverviewZorggroepenComponent', () => {
  let component: OverviewZorggroepenComponent;
  let fixture: ComponentFixture<OverviewZorggroepenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewZorggroepenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewZorggroepenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
