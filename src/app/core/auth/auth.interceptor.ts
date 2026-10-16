import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { API_BASE_URL } from '@core/config/api.config';
import { SesionStore } from './sesion.store';

const RUTA_AUTH = `${API_BASE_URL}/auth/`;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // El token solo viaja al backend propio y nunca a las rutas de login/refresh/logout
  if (!esDelBackend(req.url) || req.url.startsWith(RUTA_AUTH)) return next(req);

  const sesion = inject(SesionStore);
  const router = inject(Router);
  if (!sesion.estaAutenticado()) return next(req);

  // Refresco preventivo: el access token se renueva antes de enviar si está por vencer
  const accessToken$ = sesion.accessPorVencer() ? sesion.refrescar() : of(sesion.accessToken()!);

  return accessToken$.pipe(
    switchMap((token) =>
      next(conToken(req, token)).pipe(
        catchError((err) => {
          if (!esNoAutorizado(err)) return throwError(() => err);
          // El backend rechazó el access token: se refresca una vez y se reintenta
          return sesion.refrescar().pipe(switchMap((nuevo) => next(conToken(req, nuevo))));
        }),
      ),
    ),
    catchError((err) => {
      // Si el refresh fue rechazado la sesión quedó limpia: se vuelve al login
      if (esNoAutorizado(err) && !sesion.estaAutenticado() && !router.url.startsWith('/login')) {
        router.navigate(['/login'], { queryParams: { returnUrl: router.url } });
      }
      return throwError(() => err);
    }),
  );
};

// Se exige el separador tras la base para que "http://localhost:8080/api-otro" no coincida
function esDelBackend(url: string): boolean {
  return url === API_BASE_URL || url.startsWith(`${API_BASE_URL}/`) || url.startsWith(`${API_BASE_URL}?`);
}

function conToken(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
}

function esNoAutorizado(err: unknown): boolean {
  return err instanceof HttpErrorResponse && err.status === 401;
}
