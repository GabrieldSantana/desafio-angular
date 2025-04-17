import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { VisualizacaoComponent } from "./paginas/visualizacao/visualizacao.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VisualizacaoComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'post';
}
