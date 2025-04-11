import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from "./paginas/formulario/formulario.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    FormularioComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'formulario-validacao';
}
