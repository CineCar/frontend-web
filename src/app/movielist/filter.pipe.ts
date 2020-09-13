import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from 'com.cinecar.objects';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(items: Movie[], searchText: string): any[] {
        if (!items) {
          return [];
        }
        if (!searchText) {
          return items;
        }
        searchText = searchText.toLocaleLowerCase();
    
        return items.filter(it => {
          return it.getName().toLocaleLowerCase().includes(searchText);
        });
    }
}