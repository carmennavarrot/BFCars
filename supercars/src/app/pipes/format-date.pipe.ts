import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from '../interfaces/vehicle';

@Pipe({
  name: 'formatDate',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string): string {
    return new Date(value).toLocaleDateString();
  }

}
