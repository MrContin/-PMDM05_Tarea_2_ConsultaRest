import { GestionArticuloService } from 'src/app/services/gestion-articulos.service';
import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
})
export class ArticulosComponent  implements OnInit {
  @Input() articulos: Article = {} as Article;    // Se le pasa este valor al usar el componente
  constructor(private GestionArticuloService: GestionArticuloService, private alertcontroller: AlertController) { }

  ngOnInit() {}

    // Al pulsar sobre borrar se abre una alerta para confirmarlo
    public onClick() {
      this.confirmarBorrar();
   
    }
      // Mensaje de alerta para confirmar el borrado
  async confirmarBorrar() {
    const alert = await this.alertcontroller.create({
      header: 'Confirmar',
      message: '¿Deseas borrar este articulo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'aceptar',
          handler: () => {
            // console.log('Confirmar');
            this.GestionArticuloService.borrarArticulo(this.articulos);     // Se llama al servicio que gestiona los articulos para leer y borrarla
          }
        }
      ]
    });

    await alert.present();
  }
}
