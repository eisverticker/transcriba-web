import { Pipe, PipeTransform } from '@angular/core';
/*
 * Replaces a value only if it is empty (with a placeholder)
*/
@Pipe({name: 'replaceIfEmpty'})
export class ReplaceIfEmptyPipe implements PipeTransform {
  transform(value: string): string {
    if (value.trim() === '' || value === undefined || value === null) {
      return 'Leer';
    }else {
      return value;
    }
  }
}
