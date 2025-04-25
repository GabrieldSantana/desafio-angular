import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulo',
  standalone: true,
  imports: [],
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.css'
})
export class TituloComponent {
  @Input() titulo: string = '';
  @Input() possuiBotao: boolean = false;

  constructor(private router: Router) {}

  navegarParaFormulario(): void {
    this.router.navigate(['/formulario']);
  }
}
