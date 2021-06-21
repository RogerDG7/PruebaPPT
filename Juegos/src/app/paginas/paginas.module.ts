import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PaginasRoutingModule } from './paginas-routing.module';
import { JugarComponent } from './jugar/jugar.component';
import { RondaComponent } from './ronda/ronda.component';
import { HistorialPartidasComponent } from './historial-partidas/historial-partidas.component';
import { EstadoPartidaPipe } from '../pipes/estado-partida.pipe';


@NgModule({
  declarations: [
    JugarComponent,
    RondaComponent,
    HistorialPartidasComponent,
    EstadoPartidaPipe
  ],
  imports: [
    CommonModule,
    PaginasRoutingModule,
    ReactiveFormsModule
  ]
})
export class PaginasModule { }
