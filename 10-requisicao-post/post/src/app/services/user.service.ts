import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  usuarioAtivo: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {

  private readonly API = 'http://localhost:3000/usuarios'

  constructor(private http: HttpClient) {}

  obterUsuario(): Observable<User[]> {
    return this.http.get<User[]>(this.API)
  }

  buscarPorId(id: number): Observable<User> {
    const url = `${this.API}/${id}`
    return this.http.get<User>(url)
  }
}
