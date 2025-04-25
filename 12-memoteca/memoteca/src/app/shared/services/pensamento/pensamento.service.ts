import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interface para os dados de um pensamento
export interface Pensamento {
  id: number;
  pensamento: string;
  autor: string;
  modelo: number;
}

// Interface para o retorno paginado
export interface RetornoPaginado<T> {
  pagina: number;
  qtdPagina: number;
  totalRegistros: number;
  registros: T[];
}

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {
  private readonly API = 'https://localhost:7242/api/pensamentos';

  constructor(private http: HttpClient) {}

  obterPensamentos(): Observable<Pensamento[]> {
    return this.http.get<Pensamento[]>(this.API);
  }

  obterPensamentosPaginados(pagina: number, qtdRegistros: number): Observable<RetornoPaginado<Pensamento>> {
    const url = `${this.API}/${pagina}/${qtdRegistros}`;
    return this.http.get<RetornoPaginado<Pensamento>>(url);
  }

  salvarPensamento(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.get<Pensamento>(url);
  }

  excluirPensamento(id: number): Observable<void> {
    const url = `${this.API}/${id}`;
    return this.http.delete<void>(url);
  }

  editarPensamento(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`; // Inclui o ID na URL
    return this.http.put<Pensamento>(url, pensamento);
  }

  editarOuSalvarPensamento(pensamento: Pensamento): Observable<Pensamento> {
    if (pensamento.id) {
      return this.editarPensamento(pensamento);
    }
    return this.salvarPensamento(pensamento);
  }
}
