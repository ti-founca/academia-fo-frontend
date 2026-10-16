import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SesionStore } from './sesion.store';

export const authGuard: CanActivateFn = (_route, state) => {
  const sesion = inject(SesionStore);
  if (sesion.estaAutenticado()) return true;
  sesion.limpiar();
  return inject(Router).createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};

export const invitadoGuard: CanActivateFn = () => {
  if (!inject(SesionStore).estaAutenticado()) return true;
  return inject(Router).createUrlTree(['/welcome']);
};
