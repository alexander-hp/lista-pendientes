import { Component, ErrorHandler, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ok } from 'assert';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController) {}


    async agregarLista(){


      // this.router.navigateByUrl('/tabs/tab1/agregar');

      const alert = await this.alertCtrl.create({
        header: 'Titulo De Lista',
        inputs: [
          {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
        buttons: [
          {
            text: 'cancelar',
            role: 'cancel',
            handler: () => {
                console.log('Cancelar');
            }
          },
          {
            text: 'Crear',
            handler: ( data ) => {
              console.log(data);
              if ( data.titulo.length === 0 ){
                console.log('No hace nada');
                return;
              }
              // Aqui si es que el titulo es mayor a 0 entonces se inserta en las listas
              const listaId = this.deseosService.crearLista(data.titulo);
              // es la que se manda en servicio
              

              // aqui nos manda al url donde esta la pagina completa de agregar lista
              // cambiamos "" por `` para insertar el listaId
              this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);

            }
          }
        ]
      });

      alert.present();
  }

  listaSeleccionada( lista: Lista ){

    // aqui como ya teniamos la implementacion de el routing con una variable
    // hacemos que navegue con la variable lista y llamamos su atributo id
    this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    // console.log( lista );

  }

}
