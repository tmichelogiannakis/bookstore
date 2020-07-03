import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

function isEmptyInputValue(value: any): boolean {
  return value == null || value.length === 0;
}

export class CustomValidators {
  static range(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(min) || isEmptyInputValue(max)) {
        return null;
      }

      const value = parseFloat(control.value);

      return !isNaN(value) && (value < min || value > max) ? { range: { min: min, max: max, actual: control.value } } : null;
    };
  }
}
