import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
    loadChildren: ()=> import('./paginas/paginas.module').then(m => m.PaginasModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
