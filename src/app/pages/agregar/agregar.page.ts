import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
// creamos una lista de tipo Lista
  lista: Lista;
  nombreItem = '';
  constructor( private deseosService: DeseosService, 
                private route: ActivatedRoute){ 
                // lo tenemos que leer del url y para no generar un observable para
                // estar leyendo eso lo hacemos con .snapshot.paramMap.get('')
                // el atributo que esta llamando desbe ser igual 
                // que al del routing.module
    const listaId = this.route.snapshot.paramMap.get('listaId');
    // console.log(listaId);
    // con este console imprimimos para verificar que sea el mismo id

    // vamos hacer que esta lista sea la misma que la del deseoService
    this.lista = this.deseosService.obtenerLista( listaId );
    // console.log(this.lista);
    // aqui verificamos que nos arroje la info de la lista
    
  }
    

  ngOnInit() {
  }

  agregarItem(){

    // si el item es 0 no hara nada
    if (this.nombreItem.length === 0){
      return;
    }
    // en esta parte ya tenemos el item ahora falta agregarlo a el arreglo de items en lista
    const nuevoItem = new ListaItem( this.nombreItem );
// aqui llammos a lista seleccionamos los items y agragamos el nuevo item
    this.lista.items.push( nuevoItem );    

    // limpiamos la variable para que pueda poner una nueva
    this.nombreItem = '';
    // aqui carga y guarda los items de las listas
    this.deseosService.guardarStorage();
  }

  cambioCheck(item: ListaItem){

    // console.log(item);

    // creamos una variable pendientes la cual cheque
    // con el metodo filter el cual es un metodo que regresa una coleccion de 
    // elementos que cumplan cierta condicion en este caso que no hayan terminado
    const pendientes = this.lista.items
                        .filter( itemData => !itemData.terminado )
                        .length;
                        // nuestro length hace que se repita el mismo numero de veces
                        // que el de su tamaño

    // console.log({pendientes});

    // decimos si es que ya no hay pendientes
    if(pendientes === 0){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.deseosService.guardarStorage();
  }

  borrar( i: number ){
    // splice remueve elementos del arreglo y si es necesario
    // puede colocar nuevos elementos ahi
    // en el parametro ponemos el num desde donde comienza a borrar y despues
    // cuantos borrara
    this.lista.items.splice(i,1);

    this.deseosService.guardarStorage();
  }

}
