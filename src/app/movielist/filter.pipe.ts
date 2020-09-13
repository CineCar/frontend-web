import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchValue): any {

    if (!searchValue) return value;
    return value.filter((v) => v.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || v.size.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)

  } // TAKEN FROM: https://stackblitz.com/edit/angular-mrgzw3?file=src%2Fapp%2Ffilter.pipe.ts

}