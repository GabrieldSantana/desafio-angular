import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { MensagemErroComponent } from "../../componentes/mensagem-erro/mensagem-erro.component";

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    NgxMaskDirective,
    ReactiveFormsModule,
    MensagemErroComponent
],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  usuarioForm!: FormGroup

  constructor() {}

  ngOnInit() {
    this.inicializarFormulario()
  }

  inicializarFormulario() {
    this.usuarioForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required, Validators.minLength(11)]),
      dataNascimento: new FormControl('', Validators.required)
    })
  }

  // Função apenas para simulação
  salvarUsuario(): void{
    this.usuarioForm.reset()
  }

  enviado: boolean = false;

  verificaEnviado(): void {
    this.enviado = true
  }

  controle(nome: string): FormControl {
    const control = this.usuarioForm.get(nome);

    if(!control)
      throw new Error(`Controle de formuláirio não encontrado: ${nome}`)

    return control as FormControl
  }
}
