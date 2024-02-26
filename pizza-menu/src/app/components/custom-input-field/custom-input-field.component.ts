import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input-field',
  templateUrl: './custom-input-field.component.html',
  styleUrls: ['./custom-input-field.component.scss']
})
export class CustomInputFieldComponent {
  @Input() control!: FormControl;
  @Input() isSelected: boolean = false;

  get formattedValue(): string {
    const value = this.control.value;
    return value === 0 ? '0.00' : value.toString();
  }
}
