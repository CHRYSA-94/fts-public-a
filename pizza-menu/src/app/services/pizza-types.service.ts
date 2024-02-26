import { Injectable } from '@angular/core';
import {Item, Price, Size} from './../interfaces/item.interface';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

  export class PizzaTypeService {

    public getPizzaTypes(): Observable<Item[]> {
        let items: Item[] = [
            {
              itemId: 0,
              name: 'Margherita',
            },
            {
              itemId: 1,
              name: 'Pepperoni',
            },
          ];
          return of(items);
    }

    public getPizzaSize(): Observable<Size[]> {
        let itemSizes: Size[] = [
            {
              sizeId: 0,
              name: 'Small',
            },
            {
              sizeId: 1,
              name: 'Medium',
            },
            {
              sizeId: 2,
              name: 'Large',
            },
          ];

          return of(itemSizes);
    }

    public getPizzaPrices(): Observable<Price[]> {
        let itemPrices: Price[] = [
            {
              itemId: 0,
              sizeId: 0,
              price: 3.99,
            },
            {
              itemId: 0,
              sizeId: 1,
              price: 5.99,
            },
            {
              itemId: 0,
              sizeId: 2,
              price: 7.99,
            },
            {
              itemId: 1,
              sizeId: 0,
              price: 4.42,
            },
            {
              itemId: 1,
              sizeId: 1,
              price: 6.52,
            },
            {
              itemId: 1,
              sizeId: 2,
              price: 8.62,
            },
          ];

          return of(itemPrices);
    }
  }
