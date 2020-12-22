import { Injectable } from '@angular/core';
import { Lista } from '../models/Lista.model';

@Injectable({
  providedIn: 'root'
})

export class DeseosService {

  Listas: Lista[] = [];

  constructor() {
    this.cargarStorage();
  }

  // constructor() {


    // mandamos a llamar la info para cargarla pues solo se repite 1 vez
    // this.cargarStorage();

    // const lista1 = new Lista('Prueba 1');
    // const lista2 = new Lista('Prueba 2');
    // Aqui lo que hacemos basicamente es crear una lista como prueba

    // this.Listas.push(lista1, lista2);
    // En esta parte lo que hacemos es meter las 2 listas a Listas de la parte de arriba

    // console.log(this.Listas);
    // Aqui solo las mandamos a imprimir
  // }

  // creamos una lista a partir del control alert
  crearLista( titulo: string ){

  const nuevaLista = new Lista(titulo);
  this.Listas.push( nuevaLista );

  // llama para guardar info 
  this.guardarStorage();

  return nuevaLista.id;
  }

  borrarLista( lista: Lista ){

    // buscamos todas aquellas que son doferente de la que queremos borrar
    // y si son diferentes entonces solamente esas se van a guardar
    this.Listas = this.Listas.filter( listaData =>{
        return listaData.id !== lista.id
    });

    this.guardarStorage();
  }

  editarLista( ){

    this.guardarStorage();
  }


  obtenerLista ( id: string | number ) {
    // Aqui corroboramos que es de tipo number
    id = Number(id)

    // Verificamos que sea efectivamente el id de la lista que buscamos
    return this.Listas.find( listaData =>{
      return listaData.id === id;
    });
    // como es funcion flecha tambien podria quedar asi
    // return this.Listas.find( listaData => listaData.id === id); 
    // este metodo se llamara en agregar page 
  }  


  


// son practicamente los setters y getters


  // guarda la informacion y la hace persistente
  guardarStorage() {
      // como solo puede guardar strings entonces tenemos que convertir
      // nuestro arreglo a string eso lo hacemos con json.stringify
    localStorage.setItem('data', JSON.stringify(this.Listas) );

  }
  // la carga para ello necesita saber si hay info en el storage y mostrarla
  cargarStorage() {

    // decimos que si hay info entonces lo mandamos
    if( localStorage.getItem('data') ){
    // para hacer el proceso inverso de los strings hacemos el json.parse
    // y mandamos todo el objeto EN ESTE CASO NUESTRO GETER
    this.Listas = JSON.parse ( localStorage.getItem( 'data' ) );
  }else{
    // en caso de que no haya info lo mandamos vacio
    this.Listas = [];
  }
  }
}
