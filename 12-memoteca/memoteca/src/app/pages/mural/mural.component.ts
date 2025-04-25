import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CabecalhoComponent } from '../../shared/components/cabecalho/cabecalho.component';
import { RodapeComponent } from '../../shared/components/rodape/rodape.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { CommonModule } from '@angular/common';
import { Pensamento, PensamentoService, RetornoPaginado } from '../../shared/services/pensamento/pensamento.service';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-mural',
  standalone: true,
  imports: [
    CabecalhoComponent,
    RodapeComponent,
    TituloComponent,
    CommonModule,
    CardComponent,
  ],
  templateUrl: './mural.component.html',
  styleUrl: './mural.component.css',
})
export class MuralComponent implements OnInit {
  pensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  qtdPorPagina: number = 6;
  totalRegistros: number = 0;

  constructor(
    private pensamentoService: PensamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarPensamentos();
  }

  carregarPensamentos(): void {
    this.pensamentoService
      .obterPensamentosPaginados(this.paginaAtual, this.qtdPorPagina)
      .subscribe((retorno: RetornoPaginado<Pensamento>) => {
        this.pensamentos = retorno.registros;
        this.totalRegistros = retorno.totalRegistros;
      });
  }

  proximaPagina(): void {
    this.paginaAtual++;
    this.carregarPensamentos();
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarPensamentos();
    }
  }
}
