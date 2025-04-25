import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService, User } from '../../services/user.service';
import { CardComponent } from '../../componentes/card/card.component'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-visualizacao',
  standalone: true,
  imports: [
    CardComponent,
    ReactiveFormsModule
  ],
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.css'],
})


export class VisualizacaoComponent implements OnInit{

  idForm!: FormGroup;

  usuarioAtivo: boolean | null = null;
  userId: number | null = null; // Propriedade para armazenar o ID do input
  verificado: boolean = false;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.inicializarForm();
    this.carregarUsers();
  }

  inicializarForm() {
    this.idForm = new FormGroup({
      id: new FormControl('')
    })
  }

  carregarUsers(): void {
    const ID = this.activatedRoute.snapshot.paramMap.get('id');

    if(ID) // Caso ele não seja nulo
      this.userService.buscarPorId(parseInt(ID)).subscribe((usuario) => {
        this.idForm.patchValue(usuario)
      });
  }

  verificarUsuario(): void {
    const USUARIO = this.idForm.value;

    if (USUARIO.id !== null) {
      this.userService.buscarPorId(USUARIO.id).subscribe({
        next: (user: User) => {
          this.usuarioAtivo = user.usuarioAtivo;
          this.verificado = true;
        },
        error: (error) => {
          console.error('Erro ao buscar usuário', error);
          this.usuarioAtivo = false; // Tratar erro como usuário inativo
        }
      });
    } else {
      console.warn('Por favor, informe um ID válido.');
    }
  }
}
