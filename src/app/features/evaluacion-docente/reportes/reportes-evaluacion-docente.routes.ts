import { Routes } from '@angular/router';
import { ReporteEvdocHome } from './presentation/pages/reporte-evdoc-home/reporte-evdoc-home';
import { ReporteEvdocDocente } from './presentation/pages/reporte-evdoc-docente/reporte-evdoc-docente';

export const REPORTES_EVALUACION_DOCENTE_ROUTES: Routes = [
     {
          path: '',
          component: ReporteEvdocHome
     },
     {
          path: ':idPeriodo/docentes/:idDocente',
          component: ReporteEvdocDocente
     }
];
