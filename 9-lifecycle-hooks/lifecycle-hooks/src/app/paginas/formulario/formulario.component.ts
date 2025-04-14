import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MensagemErroComponent } from "../../componentes/mensagem-erro/mensagem-erro.component";

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MensagemErroComponent
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit, OnDestroy {

  usuarioForm!: FormGroup;
  enviado: boolean = false;

  constructor() {}

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.usuarioForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      estado: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      instituicao: new FormControl('')
    });
  }

  // Função apenas para simulação
  salvarUsuario(): void {
    this.usuarioForm.reset();
  }

  verificaEnviado(): void {
    this.enviado = true;
  }

  controle(nome: string): FormControl {
    const control = this.usuarioForm.get(nome);

    if (!control)
      throw new Error(`Controle de formulário não encontrado: ${nome}`);

    return control as FormControl;
  }

  ngOnDestroy(): void {
    this.usuarioForm.reset(); // Limpa o formulário
    this.enviado = false; // Reseta o estado de enviado
  }
}