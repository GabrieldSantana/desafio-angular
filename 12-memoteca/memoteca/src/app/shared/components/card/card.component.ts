import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PensamentoService, Pensamento } from '../../services/pensamento/pensamento.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() previa: boolean = false;
  @Input() pensamento: string = '';
  @Input() autor: string = '';
  @Input() classeSombra: string = '';
  @Input() id!: number;

  @Output() pensamentoDeletado = new EventEmitter<void>(); // Evento para notificar exclusão
  @Output() pensamentoEditado = new EventEmitter<void>(); // Novo evento para notificar edição

  constructor(
    private pensamentoService: PensamentoService,
    private router: Router
  ) {}

  aoEditar(): void {
    // Busca os dados atuais do pensamento para preencher o modal
    this.pensamentoService.buscarPorId(this.id).subscribe({
      next: (pensamento: Pensamento) => {
        Swal.fire({
          title: 'Editar Pensamento',
          html: `
            <div class="text-left">
              <label for="pensamento" class="block mb-2 font-bold">Pensamento:</label>
              <textarea id="pensamento" class="swal2-textarea w-full" style="min-height: 100px;" required>${pensamento.pensamento}</textarea>

              <label for="autor" class="block mt-4 mb-2 font-bold">Autor:</label>
              <input id="autor" class="swal2-input w-full" value="${pensamento.autor}" required />

              <label for="modelo" class="block mt-4 mb-2 font-bold">Modelo:</label>
              <select id="modelo" class="swal2-select w-full">
                <option value="1" ${pensamento.modelo === 1 ? 'selected' : ''}>Modelo 1</option>
                <option value="2" ${pensamento.modelo === 2 ? 'selected' : ''}>Modelo 2</option>
                <option value="3" ${pensamento.modelo === 3 ? 'selected' : ''}>Modelo 3</option>
              </select>
            </div>
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Salvar',
          cancelButtonText: 'Cancelar',
          preConfirm: () => {
            const pensamentoInput = (document.getElementById('pensamento') as HTMLTextAreaElement).value;
            const autorInput = (document.getElementById('autor') as HTMLInputElement).value;
            const modeloInput = (document.getElementById('modelo') as HTMLSelectElement).value;

            // Validação
            if (!pensamentoInput || pensamentoInput.length < 3) {
              Swal.showValidationMessage('O pensamento deve ter no mínimo 3 caracteres.');
              return false;
            }
            if (!autorInput || autorInput.length < 2) {
              Swal.showValidationMessage('O autor deve ter no mínimo 2 caracteres.');
              return false;
            }

            return {
              id: this.id,
              pensamento: pensamentoInput,
              autor: autorInput,
              modelo: Number(modeloInput),
            };
          },
        }).then((result) => {
          if (result.isConfirmed) {
            const pensamentoEditado: Pensamento = result.value;
            this.pensamentoService.editarPensamento(pensamentoEditado).subscribe({
              next: () => {
                Swal.fire({
                  icon: 'success',
                  title: 'Sucesso!',
                  text: 'Pensamento atualizado com sucesso!',
                  confirmButtonText: 'OK',
                  timer: 3000,
                  timerProgressBar: true,
                });
                this.pensamentoEditado.emit(); // Notifica o MuralComponent para recarregar a lista
              },
              error: (error) => {
                const mensagemErro = error.error?.message || 'Erro ao atualizar o pensamento. Tente novamente.';
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
          }
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
      },
    });
  }

  aoDeletar(): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pensamentoService.excluirPensamento(this.id).subscribe({
          next: () => {
            console.log(`Pensamento ${this.id} deletado com sucesso!`);
            Swal.fire({
              icon: 'success',
              title: 'Sucesso!',
              text: 'Pensamento deletado com sucesso!',
              confirmButtonText: 'OK',
              timer: 3000,
              timerProgressBar: true,
            });
            this.pensamentoDeletado.emit();
          },
          error: (error) => {
            console.error('Erro ao deletar pensamento:', error);
            let mensagemErro = 'Erro ao deletar o pensamento. Tente novamente.';
            if (error.status === 404) {
              mensagemErro = 'Pensamento não encontrado. Ele pode já ter sido deletado.';
            } else if (error.status === 400) {
              mensagemErro = error.error?.message || 'Erro na requisição. Verifique os dados e tente novamente.';
            }
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
      }
    });
  }
}
