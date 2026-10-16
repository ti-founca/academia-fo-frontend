import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  defaultIfEmpty,
  finalize,
  map,
  Observable,
  of,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';
import { AutenticacionRepository } from './domain/repository/autenticacion.repository';
import { Sesion } from './domain/model/sesion.model';

const STORAGE_KEY = 'academiafo.sesion';
// Margen para refrescar antes de que el access token venza en pleno vuelo
const MARGEN_REFRESCO_MS = 30_000;

@Injectable({ providedIn: 'root' })
export class SesionStore {
  private readonly repository = inject(AutenticacionRepository);
  private readonly sesion = signal<Sesion | null>(this.leerStorage());
  private refrescoEnCurso: Observable<string> | null = null;

  readonly usuario = computed(() => this.sesion()?.usuario ?? null);
  readonly nombreCompleto = computed(() => {
    const u = this.usuario();
    return u ? `${u.nombre} ${u.apellido}` : '';
  });

  constructor() {
    // Sincroniza la sesión entre pestañas: el refresh rota los tokens y un login/logout en otra
    // pestaña debe reflejarse aquí para no usar un refresh token ya revocado
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY || e.key === null) this.sesion.set(this.leerStorage());
    });
  }

  // La sesión es válida mientras no venza el refresh token; el access token se renueva con él
  estaAutenticado(): boolean {
    const s = this.sesion();
    return s != null && new Date(s.refreshExpiraEn).getTime() > Date.now();
  }

  accessToken(): string | null {
    return this.sesion()?.accessToken ?? null;
  }

  accessPorVencer(): boolean {
    const s = this.sesion();
    return s == null || new Date(s.accessExpiraEn).getTime() - MARGEN_REFRESCO_MS <= Date.now();
  }

  /**
   * Renueva los tokens y devuelve el nuevo access token. Las llamadas concurrentes comparten una
   * única petición, porque el backend revoca el refresh token usado (rotación).
   */
  refrescar(): Observable<string> {
    if (this.refrescoEnCurso) return this.refrescoEnCurso;
    const actual = this.sesion();
    if (!actual) return throwError(() => new HttpErrorResponse({ status: 401 }));

    this.refrescoEnCurso = this.repository.refrescar(actual.refreshToken).pipe(
      catchError((err) => {
        // Otra pestaña pudo haber rotado el token justo antes: se adopta la sesión que dejó guardada
        const guardada = this.leerStorage();
        if (guardada && guardada.refreshToken !== actual.refreshToken) return of(guardada);
        // Solo un rechazo del backend cierra la sesión; un error de red no
        if (err instanceof HttpErrorResponse && err.status === 401) this.limpiar();
        return throwError(() => err);
      }),
      tap((sesion) => this.guardar(sesion)),
      map((sesion) => sesion.accessToken),
      finalize(() => (this.refrescoEnCurso = null)),
      shareReplay(1),
    );
    return this.refrescoEnCurso;
  }

  iniciarSesion(correo: string, clave: string): Observable<void> {
    return this.repository.iniciarSesion(correo, clave).pipe(
      tap((sesion) => this.guardar(sesion)),
      map(() => undefined),
    );
  }

  // Revoca el refresh token en el backend; la sesión local se limpia aunque la petición falle
  cerrarSesion(): Observable<void> {
    const refreshToken = this.sesion()?.refreshToken;
    const peticion = refreshToken
      ? this.repository.cerrarSesion(refreshToken).pipe(catchError(() => of(undefined)))
      : of(undefined);
    return peticion.pipe(
      defaultIfEmpty(undefined),
      map(() => undefined),
      tap(() => this.limpiar()),
    );
  }

  limpiar(): void {
    this.sesion.set(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  private guardar(sesion: Sesion): void {
    this.sesion.set(sesion);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sesion));
    } catch {}
  }

  private leerStorage(): Sesion | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const sesion = JSON.parse(raw) as Sesion;
      if (!sesion?.accessToken || !sesion?.refreshToken || !sesion?.usuario) throw new Error();
      return sesion;
    } catch {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      return null;
    }
  }
}
