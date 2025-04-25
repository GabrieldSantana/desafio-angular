import { Routes } from '@angular/router';
import { VisualizacaoComponent } from './paginas/visualizacao/visualizacao.component';

export const routes: Routes = [
  { path: 'visualizacao', component: VisualizacaoComponent },
  { path: '', redirectTo: '/visualizacao', pathMatch: 'full' }
];
