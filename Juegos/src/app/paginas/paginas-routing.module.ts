import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialPartidasComponent } from './historial-partidas/historial-partidas.component';
import { JugarComponent } from './jugar/jugar.component';
import { RondaComponent } from './ronda/ronda.component';

const routes: Routes = [
  {
    path: '',
    component: JugarComponent,
    children: [
        {
          path:'jugar',
          component: JugarComponent
        },
        {
          path:'ronda',
          component: RondaComponent
        },
        {
          path: '',
          redirectTo: 'jugar',
          pathMatch: 'full'
        }
    ],
  },
  {
    path:'historialPartidas',
    component: HistorialPartidasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginasRoutingModule { }
