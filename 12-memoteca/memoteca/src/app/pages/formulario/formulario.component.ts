import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CabecalhoComponent } from '../../shared/components/cabecalho/cabecalho.component';
import { RodapeComponent } from '../../shared/components/rodape/rodape.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Pensamento, PensamentoService } from '../../shared/services/pensamento/pensamento.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    CommonModule,
    CabecalhoComponent,
    RodapeComponent,
    TituloComponent,
    CardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  pensamentoForm!: FormGroup;
  isEdicao: boolean = false; // Flag para determinar se é edição ou criação
  pensamentoId: number | null = null; // ID do pensamento (se for edição)

  constructor(
    private fb: FormBuilder,
    private pensamentoService: PensamentoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pensamentoForm = this.fb.group({
      pensamento: ['', [Validators.required, Validators.minLength(3)]],
      autor: ['', [Validators.required, Validators.minLength(2)]],
      modelo: ['1', Validators.required],
    });

    // Verifica se há um ID na rota (modo de edição)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdicao = true;
      this.pensamentoId = +id;
      this.pensamentoService.buscarPorId(this.pensamentoId).subscribe({
        next: (pensamento: Pensamento) => {
          this.pensamentoForm.patchValue({
            pensamento: pensamento.pensamento,
            autor: pensamento.autor,
            modelo: pensamento.modelo.toString(), // Converte para string para o radio button
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Pensamento não encontrado.',
            confirmButtonText: 'OK',
            timer: 5000,
            timerProgressBar: true,
          });
          this.router.navigate(['/mural']);
        },
      });
    }
  }

  enviar(): void {
    if (this.pensamentoForm.valid) {
      const pensamento: Pensamento = {
        id: this.pensamentoId ?? 0, // Usa 0 para novos pensamentos
        pensamento: this.pensamentoForm.value.pensamento,
        autor: this.pensamentoForm.value.autor,
        modelo: Number(this.pensamentoForm.value.modelo), // Garante que seja número
      };

      this.pensamentoService.editarOuSalvarPensamento(pensamento).subscribe({
        next: (response) => {
          console.log(pensamento);
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: this.isEdicao ? 'Pensamento atualizado com sucesso!' : 'Pensamento salvo com sucesso!',
            confirmButtonText: 'OK',
            timer: 3000,
            timerProgressBar: true,
          }).then(() => {
            this.router.navigate(['/mural']);
          });
        },
        error: (error) => {
          const mensagemErro = error.error?.message || 'Erro ao salvar o pensamento. Tente novamente.';
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: mensagemErro,
            confirmButtonText: 'OK',
            timer: 5000,
            timerProgressBar: true,
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção!',
        text: 'Por favor, preencha todos os campos corretamente.',
        confirmButtonText: 'OK',
        timer: 5000,
        timerProgressBar: true,
      });
    }
  }

  cancelar(): void {
    Swal.fire({
      icon: 'info',
      title: 'Cancelado',
      text: 'Operação cancelada.',
      confirmButtonText: 'OK',
      timer: 3000,
      timerProgressBar: true,
    }).then(() => {
      this.router.navigate(['/mural']);
    });
  }

  getClasseSombra(): string {
    const modelo = this.pensamentoForm.value.modelo;
    return modelo === '1' ? 'sombra-azul' : modelo === '2' ? 'sombra-ciano' : 'sombra-verde';
  }
}
