import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: 'welcome',
    loadChildren: () => import('./features/welcome/welcome.routes').then((m) => m.WELCOME_ROUTES),
  },
  {
    path: 'evaluacion-docente/reportes',
    loadChildren: () => import('./features/evaluacion-docente/reportes/reportes-evaluacion-docente.routes').then((m)=>m.REPORTES_EVALUACION_DOCENTE_ROUTES)
  }
];
