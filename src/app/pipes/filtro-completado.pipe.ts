import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroCompletado',
  // el pure es para que cada vez que se detecte una accion de cambios
  // no importe donde este nuestro pipe este se realizara automaticamente
  pure: false
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], completada: boolean = true): Lista[] {
    
    
    return listas.filter( lista=>{
      return lista.terminada === completada;
  });

  }

}
