import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaTypeCardComponent } from './pizza-type-card.component';

describe('PizzaTypeCardComponent', () => {
  let component: PizzaTypeCardComponent;
  let fixture: ComponentFixture<PizzaTypeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaTypeCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaTypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
