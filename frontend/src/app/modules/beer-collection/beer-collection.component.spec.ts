import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerCollectionComponent } from './beer-collection.component';

describe('DashboardComponent', () => {
  let component: BeerCollectionComponent;
  let fixture: ComponentFixture<BeerCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
