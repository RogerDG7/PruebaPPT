import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoPartida'
})
export class EstadoPartidaPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    if(value === 1){
      return 'Perdida'
    }else if (value == 2)
    {
      return 'Ganada'
    }else {
      return 'Empatada';
    }
    
  }

}
