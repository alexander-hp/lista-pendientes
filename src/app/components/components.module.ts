import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasComponent } from './listas/listas.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    ListasComponent
  ],
  // asi como hay imports hay exports son las cosas que son propias
  // de este modula que la querramos mandar a otro modulo, pag. etc
  exports:[
    ListasComponent
  ],
  imports: [
    CommonModule,
    // importamos ionic module para que nos detecte en el html los comp de ionic
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
