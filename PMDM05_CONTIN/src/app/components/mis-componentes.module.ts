import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { IonicModule } from '@ionic/angular';
import { ArticulosComponent } from './articulos/articulos.component';



@NgModule({
  declarations: [
    PageHeaderComponent,
    ArticulosComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    PageHeaderComponent,
    ArticulosComponent
  ]
})
export class MisComponentesModule { }
