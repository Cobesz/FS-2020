import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailviewZorgroepComponent } from './detailview-zorgroep.component';

describe('DetailviewZorgroepComponent', () => {
  let component: DetailviewZorgroepComponent;
  let fixture: ComponentFixture<DetailviewZorgroepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailviewZorgroepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailviewZorgroepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
