import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  // el viewchild se hace para hacer una referencia local a ion-list
  // y como es el unico entonces lo agarra automaticamente 
  @ViewChild ( IonList ) lista: IonList;
  @Input() terminado = true;

// DeseosService tiene que llamarse tambien en el html por eso debe de ser publico
  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController
  ){ }

  ngOnInit() {}

  listaSeleccionada( lista: Lista ){

    if(this.terminado === true){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    }else{
    // aqui como ya teniamos la implementacion de el routing con una variable
    // hacemos que navegue con la variable lista y llamamos su atributo id
    this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    // console.log( lista );
    }
  }

  borrarLista( lista: Lista ){

    this.deseosService.borrarLista( lista );
    
  }

   
  async editarLista( lista: Lista ){

    const alert = await this.alertCtrl.create({
      header: 'Renombrar Titulo',
      inputs: [
        {
        name: 'titulo',
        type: 'text',
        value: lista.titulo,
        placeholder: 'Nuevo nombre de la lista'
      }
    ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
              console.log('Cancelar');
              this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Aceptar',
          handler: ( data ) => {
            console.log(data);
            if ( data.titulo.length === 0 ){
              console.log('No hace nada');
              return;
            }

            lista.titulo = data.titulo;

            this.deseosService.guardarStorage();
            // como ya pasamos la referencia con html de lista entonces
            // podemos utilizar el close de sliding
            this.lista.closeSlidingItems();

          }
        }
      ]
    });

    alert.present();

  }

}
