import { Article } from './../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GestionStorageService } from './gestion-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GestionArticuloService {
   articulosParaLeer: Article[] = [];

  constructor(public leerFichero: HttpClient, private gestionAlmacen: GestionStorageService) {
    
    let datosPromesa: Promise<Article[]> = gestionAlmacen.getObject("articulos");
    
    datosPromesa.then( datos => {
      if (datos) {
        this.articulosParaLeer.push(...datos);
      } else {
        this.getArticulosFichero();
      }
      console.log(datos);
      console.log(this.articulosParaLeer);
    });
  }
/**
 * Este metodo obtiene los datos de un archivo JSON que contiene una lista de articulos.
 * Los datos son recuperados mediante una llamada a un servicio que devuelve un Observable.
 * Una vez que los datos son recibidos, son agregados al array de artículos para su uso.
 * Ademas, los datos son almacenados en el almacenamiento local
 */
  getArticulosFichero() {
    let datosFichero: Observable<Article[]>;

    datosFichero = this.leerFichero.get<Article[]>("/assets/datos/articulos.json");
    // Se suscribe a los datos obtenidos del archivo JSON
    datosFichero.subscribe(datos => {
      console.log(datos);
      // Se agregan los datos recibidos al array local de articulos
      this.articulosParaLeer.push(...datos);
      // Se almacenan los articulos en el almacenamiento local
      this.gestionAlmacen.setObject("articulos", this.articulosParaLeer);
      console.log(this.articulosParaLeer);
    });

  }
/**
 * Se busca un artículo en el array
 * En este caso, la función compara cada articulo del array con el artículo pasado como parametro. 
 * La comparacion se realiza convirtiendo ambos objetos en cadenas JSON y luego comparando esas cadenas
 * Si el articulo dado se encuentra en el array, findIndex devuelve el indice de ese articulo
 * @param item 
 * @returns 
 */

  public buscar(item: Article): number  {
    let indice: number = this.articulosParaLeer.findIndex( //para buscar el índice del primer elemento que cumple con la condición especifica
      function(cadaArticulo) { 
        return JSON.stringify(cadaArticulo) == JSON.stringify(item);
      }
    );
    //let indice = this.noticiasLeer.indexOf(articuloEncontrado);
    return indice;
  }


  /**
 * Añade un articulo al array de articulos para leer y actualiza el almacenamiento local.
 * @param item El articulo que se va a añadir.
 */
  // Se añade la noticia al array y se actualiza en el almacenamiento local
  public addArticulo(item: Article) {
    // Convierte el articulo a una cadena JSON y luego vuelve a parsearlo para asegurar que sea un objeto limpio.
    let itemString = JSON.stringify(item);//Esta línea convierte el objeto item en una cadena JSON.
    item = JSON.parse(itemString);//toma una cadena JSON y la convierte de nuevo en un objeto JavaScript.
    // Agrega el artículo al array de artículos para leer.
    this.articulosParaLeer.push(item);
    // Actualiza el almacenamiento local con el nuevo array de artículos.
    this.gestionAlmacen.setObject("articulos", this.articulosParaLeer);
    // console.log(this.articulosParaLeer);
}

// Se busca el articulo en el array y se borra
public borrarArticulo(item: Article) {
  let indice = this.buscar(item);

  if (indice != -1) {
    this.articulosParaLeer.splice(indice, 1);
    this.gestionAlmacen.setObject("articulos", this.articulosParaLeer);
  }
  // console.log(this.articulosParaLeer);
}
// Devuelve el contenido del array
public getNoticias() {
  return this.articulosParaLeer;
}

/*
  // Insertar una nueva persona
  insertarPersona(id: string, nombre: string, apellido: string) {
    // Creamos la nueva IPersona
    let nuevaPersona: IPersona = {
      id: id,
      nombre: nombre,
      apellido: apellido
    };

    // La insertamos
    this.personas.push(nuevaPersona);
    this.gestionAlmacen.setObject("personas", this.personas);

    // this.personas = [...this.personas, nuevaPersona];  // Crea una copia del array para que el array sea inmutable

    console.log(this.personas);


  }

  // Borra la persona con el id dado
  borrarPersona(id: string) {

    // Busca la persona con el id dado. Utiliza una función anónima como parámetro
    let personaEncontrada: IPersona = this.personas.find(function(cadaPersona) { return cadaPersona.id == id });

    // Busca la persona con el id dado. Utiliza una función arrow como parámetro
    // let personaEncontrada: IPersona = this.personas.find((cadaPersona) => cadaPersona.id == id );
    
    console.log(personaEncontrada);
    if (personaEncontrada) {
      // Busca el índice de la persona
      let indice: number = this.personas.indexOf(personaEncontrada);
      console.log(indice);

      if (indice != -1) {
        // Borra la persona con el índice obtenido
        this.personas.splice(indice, 1);
        this.gestionAlmacen.setObject("personas", this.personas);

        // Genera un nuevo array sin el elemento a borrar y lo asigna
        // let inicio = this.personas.slice(0, indice);             // Copia primera parte del array
        // let final= this.personas.slice(indice + 1);              // Copia la parte final
        // this.personas = [...inicio, ...final];                   // Añade todos los elementos copiados
        
        console.log(this.personas);
      }
    }
  }
  
  modificarPersona(id: string, nombre: string, apellido: string) {
    // Busca la persona con el id dado. Utiliza una función anónima como parámetro
    let personaEncontrada: IPersona = this.personas.find(function(cadaPersona) { return cadaPersona.id == id });
    let indice: number = this.personas.indexOf(personaEncontrada);
    this.personas[indice].nombre = nombre;
    this.personas[indice].apellido = apellido;
    this.gestionAlmacen.setObject("personas", this.personas);
  }*/
}
