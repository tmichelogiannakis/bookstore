import { CustomValidators } from './custom.validators';
import { FormControl } from '@angular/forms';

describe('CustomValidators.range', () => {
  const rangeValidator = CustomValidators.range(10, 20);
  const control = new FormControl('input');

  it('should return null if input is less than max and greater than min', () => {
    control.setValue(15);
    expect(rangeValidator(control)).toBeNull();
  });

  it('should return error if input is greater than max', () => {
    control.setValue(25);
    expect(rangeValidator(control)).toEqual({ range: { min: 10, max: 20, actual: control.value } });
  });

  it('should return error if input is less than min', () => {
    control.setValue(5);
    expect(rangeValidator(control)).toEqual({ range: { min: 10, max: 20, actual: control.value } });
  });
});
