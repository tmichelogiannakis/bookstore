import { Pipe, PipeTransform } from '@angular/core';
import { isEmptyInputValue } from '../utils';

@Pipe({
  name: 'array'
})
export class ArrayPipe implements PipeTransform {
  transform(value: any | any[], separator: string, ...args: unknown[]): unknown {
    if (!isEmptyInputValue(value)) {
      if (Array.isArray(value)) {
        return value.join(separator);
      }
      return value;
    }
    return null;
  }
}
