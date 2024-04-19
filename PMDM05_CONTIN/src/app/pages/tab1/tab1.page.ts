import { Article, RespuestaNoticias } from 'src/app/interfaces/interfaces';
import { GestionArticuloService } from './../../services/gestion-articulos.service';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  
  // Array de la cabecera de las categorias de las noticias
  // Si tan solo se desea mostrar una categoria basta con escribir su nombre dentro del array y esta se mostrara ej "Business"
  categorias: string[] = ["BUSINESS","TECHNOLOGY","SCIENCE","GENERAL","SPORTS"];
  //Para generar la consulta necesitamos de los siguientes atributos
  //localizados en la carpeta environment
  apiKey: string = environment.apiKey;
  apiUrl: string = environment.apiUrl;
  //Definimos el array de artículos de tipo Article (Vacio)
  articulos: Article[] = []; 
  

  constructor(private recogerDatos: HttpClient, public gestionArticuloService: GestionArticuloService) {
    //this.cargarArticulos();
    //Se tienen que cargar las categorias de las noticias que se van a mostrar
    this.cargarArticulos(this.categorias[0]);
  }
  ngOnInit() {
    
  }

  /**
   * se encarga de cargar los artículos de noticias desde la categorías de la API de NewsAPI 
   * Ademas los agrega al array articulos
   * Se construye una URL para realizar una consulta a la API de NewsAPI junto a la clave de API
   * @param categorias 
   */
  cargarArticulos(categorias: string) {
    let respuesta: Observable<RespuestaNoticias> = this.recogerDatos.get<RespuestaNoticias>("https://newsapi.org/v2/top-headlines?category="+ categorias + "&apiKey=" + this.apiKey);
    respuesta.subscribe( resp => {
      if (resp) {
        this.articulos.push(... resp.articles);
        console.log(this.articulos);
      }
    } );
  }
    
  // se encarga de cambiar la categoría de los articulos que se estan 
  // mostrando en funcion de la opcion seleccionada por el usuario
  public cambiarCategoria(eventoRecibido: any) {
    this.articulos = [];
    this.cargarArticulos(eventoRecibido.detail.value);
  }

  /**
   * si se encuentra el valor a devolver es 1, de lo contrario devuelve -1
   */
  public buscar(articulo: Article): boolean {
    return this.gestionArticuloService.buscar(articulo) !== -1;
  }
  
  // Comprueba si se ha seleccionado o no el articulo 
  //Si está marcado, agrega el articulo al array. 
  //Si no esta marcado, elimina el articulo del array,utilizando la informacion del evento
  public check(eventoRecibido: any, item: Article) {
    let estado: boolean = eventoRecibido.detail.checked;
    if (estado) {
      this.gestionArticuloService.addArticulo(item);
      console.log("articulo añadido "+ item.title);
    } else {
      this.gestionArticuloService.borrarArticulo(item);
      console.log("articulo borrado "+ item.title);
    }
    
  }
 


  
}
