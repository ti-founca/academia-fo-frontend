import { API_BASE_URL } from '@core/config/api.config';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AutenticacionRepository } from '../domain/repository/autenticacion.repository';
import { Sesion } from '../domain/model/sesion.model';
import { UsuarioAutenticado } from '../domain/model/usuario-autenticado.model';

interface TokensResponse {
  tipo: string;
  accessToken: string;
  accessExpiraEn: string;
  refreshToken: string;
  refreshExpiraEn: string;
  usuario: UsuarioAutenticado;
}

@Injectable()
export class AutenticacionApiService implements AutenticacionRepository {
  private readonly http = inject(HttpClient);
  private baseUrl = `${API_BASE_URL}/auth`;

  iniciarSesion(correo: string, clave: string): Observable<Sesion> {
    return this.http
      .post<TokensResponse>(`${this.baseUrl}/login`, { correo, clave })
      .pipe(map(({ tipo, ...sesion }) => sesion));
  }

  refrescar(refreshToken: string): Observable<Sesion> {
    return this.http
      .post<TokensResponse>(`${this.baseUrl}/refresh`, { refreshToken })
      .pipe(map(({ tipo, ...sesion }) => sesion));
  }

  cerrarSesion(refreshToken: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, { refreshToken });
  }
}
