import { Routes } from '@angular/router';

import { FormularioComponent } from './pages/formulario/formulario.component';
import { MuralComponent } from './pages/mural/mural.component';

export const routes: Routes = [
  {
    path: 'formulario',
    component: FormularioComponent
  },
  // {
  //   path: 'formulario/:id',
  //   component: FormularioComponent
  // },
  {
      path: 'mural',
      component: MuralComponent
  },
  {
      path: '',
      redirectTo: '/mural',
      pathMatch: 'full' //Full verifica toda a url para fazer o match do redirecionamento
  }
];
