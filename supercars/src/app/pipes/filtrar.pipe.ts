import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from '../interfaces/vehicle';

@Pipe({
  name: 'filtrar',
  standalone: true
})
export class FiltrarPipe implements PipeTransform {

  transform(value: Vehicle[], filtro: string): Vehicle[] {
    return value.filter(x=> x.model.toLowerCase().includes(filtro) || x.brand.toLocaleLowerCase().includes(filtro))
  }

}
