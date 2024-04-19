import { Component } from '@angular/core';
import { GestionArticuloService } from 'src/app/services/gestion-articulos.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
//articulos: any;

  constructor(public gestionNoticias: GestionArticuloService) {}

}
