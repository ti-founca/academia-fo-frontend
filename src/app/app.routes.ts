import { Routes } from '@angular/router';
import { MainLayout } from '@layout/main-layout/main-layout';
import { authGuard, invitadoGuard } from '@core/auth/auth.guards';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [invitadoGuard],
    loadChildren: () =>
      import('./features/autenticacion/autenticacion.routes').then((m) => m.AUTENTICACION_ROUTES),
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'welcome' },
      {
        path: 'welcome',
        loadChildren: () => import('./features/welcome/welcome.routes').then((m) => m.WELCOME_ROUTES),
      },
      {
        path: 'evaluacion-docente/reportes',
        loadChildren: () => import('./features/evaluacion-docente/reportes/reportes-evaluacion-docente.routes').then((m)=>m.REPORTES_EVALUACION_DOCENTE_ROUTES)
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
