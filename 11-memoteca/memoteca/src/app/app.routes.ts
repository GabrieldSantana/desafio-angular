import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'mural',
    pathMatch: 'full'
  },
  {
    path: 'mural',
    component: 'MuralComponent'
  },
  {
    path: 'formulario',
    component: 'FormularioComponent'
  },

];
