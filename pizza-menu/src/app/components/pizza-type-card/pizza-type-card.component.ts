import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Item, Price, Size } from 'src/app/interfaces/item.interface';
import { PizzaTypeService } from 'src/app/services/pizza-types.service';

@Component({
  selector: 'app-pizza-type-card',
  templateUrl: './pizza-type-card.component.html',
  styleUrls: ['./pizza-type-card.component.scss'],
})
export class PizzaTypeCardComponent implements OnInit, OnDestroy {
  @Input() type?: Item;
  @Input() prices: Price[] = [];
  @Input() allSizes: Size[] = [];
  @Input() itemId!: number;

  public panelOpenState = false;
  public pizzaTypeForm!: FormGroup;
  private destroy$ = new Subject<void>();
  private initialItemState: any;

  constructor(
    private pizzaTypeService: PizzaTypeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
    this.pizzaTypeService.getPizzaSize()
      .pipe(takeUntil(this.destroy$))
      .subscribe((size) => {
        this.allSizes = size;
        if (this.prices.length && this.allSizes.length) {
          this.patchValueForm();
        }
      });

    this.pizzaTypeForm.valueChanges.subscribe(() => {
      this.savePriceToLocSt();
    });

    this.pizzaTypeForm.get('small.isSelected')?.valueChanges.subscribe((isSelected: boolean) => {
        if (!isSelected) {
          this.pizzaTypeForm.get('small.price')?.patchValue(0);
          this.pizzaTypeForm.get('small.price')?.disable();
        } else {
          this.pizzaTypeForm.get('small.price')?.enable();
        }
      });

    this.pizzaTypeForm.get('medium.isSelected')?.valueChanges.subscribe((isSelected: boolean) => {
        if (!isSelected) {
          this.pizzaTypeForm.get('medium.price')?.patchValue(0);
          this.pizzaTypeForm.get('medium.price')?.disable();
        } else {
          this.pizzaTypeForm.get('medium.price')?.enable();
        }
      });

    this.pizzaTypeForm.get('large.isSelected')?.valueChanges.subscribe((isSelected: boolean) => {
        if (!isSelected) {
          this.pizzaTypeForm.get('large.price')?.patchValue(0);
          this.pizzaTypeForm.get('large.price')?.disable();
        } else {
          this.pizzaTypeForm.get('large.price')?.enable();
        }
      });
  }

  private initFormGroup() {
    this.pizzaTypeForm = this.fb.group({
      small: this.fb.group({
        isSelected: [true, Validators.required],
        price: ['', Validators.required],
      }),
      medium: this.fb.group({
        isSelected: [true, Validators.required],
        price: ['', Validators.required],
      }),
      large: this.fb.group({
        isSelected: [true, Validators.required],
        price: ['', Validators.required],
      }),
    });
  }

  private getPriceForSize(sizeId: number): number | null {
    const priceObj = this.prices.find((price) => price.sizeId === sizeId);
    return priceObj ? priceObj.price : null;
  }

  private patchValueForm() {
    this.allSizes.forEach((size) => {
      const sizeName = size.name.toLowerCase();
      const price = this.getPriceForSize(size.sizeId);
      this.pizzaTypeForm.get(sizeName)?.patchValue({
        price: price ? price : 0,
      });
    });
    this.initialItemState = this.pizzaTypeForm.value;

    if (localStorage.length) {
      const savedItemState = localStorage.getItem('item_' + this.itemId);
      if (savedItemState) {
        const ls = JSON.parse(savedItemState);

        this.pizzaTypeForm.patchValue(ls);

        this.allSizes.forEach((size) => {
          const sizeName = size.name.toLowerCase();
          const price = this.pizzaTypeForm.get(`${sizeName}.price`)?.value;
          price === 0 && this.pizzaTypeForm.get(`${sizeName}.price`)?.disable();
        });
      }
    }
  }

  private savePriceToLocSt(): void {
    localStorage.setItem('item_' + this.itemId,JSON.stringify(this.pizzaTypeForm.getRawValue()));
  }

  public onStateRevert() {
    localStorage.removeItem('item_' + this.itemId);
    this.pizzaTypeForm.setValue(this.initialItemState);
    this.patchValueForm();
  }

  public price(sizeName: string) {
    const size = sizeName.toLowerCase();
    return this.pizzaTypeForm.get(size)?.get('price') as FormControl;
  }

  public isSelected(sizeName: string) {
    const size = sizeName.toLowerCase();
    return (this.pizzaTypeForm.get(size)?.get('isSelected') as FormControl).value;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
