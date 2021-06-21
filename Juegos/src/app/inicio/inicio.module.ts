import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { SharedModule } from '../shared/shared.module';
import { PaginasModule } from '../paginas/paginas.module';


@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    SharedModule,
    PaginasModule
  ]
})
export class InicioModule { }
