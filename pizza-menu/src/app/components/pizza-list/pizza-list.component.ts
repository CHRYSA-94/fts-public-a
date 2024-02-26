import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Item, Price } from 'src/app/interfaces/item.interface';
import { PizzaTypeService } from 'src/app/services/pizza-types.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss']
})
export class PizzaListComponent implements OnInit{
  public panelOpenState = false;
  public pizzaTypesList:Item[] = [];
  public allPizzaPrices:Price[] = [];

  private destroy$ = new Subject<void>();

  constructor(private pizzaTypeService: PizzaTypeService) {}

  ngOnInit(): void {
   this.pizzaTypeService.getPizzaTypes().pipe(takeUntil(this.destroy$)).subscribe(items => {
    this.pizzaTypesList = items;
   });

   this.pizzaTypeService.getPizzaPrices().pipe(takeUntil(this.destroy$)).subscribe(prices => {
     this.allPizzaPrices = prices;
   });
  }

  public getPriceById(id: number):Price[] {
    return this.allPizzaPrices.filter(val => val.itemId === id);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
