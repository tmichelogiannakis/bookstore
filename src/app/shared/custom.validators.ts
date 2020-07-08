import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { isEmptyInputValue } from './utils';

export class CustomValidators {
  // Validator that requires the control's value to within a range of of provided values.
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
