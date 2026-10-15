import { inject, Injectable, Signal, signal } from '@angular/core';
import { EvaluacionDocente } from '../read-model/evaluacion-docente.model';
import { ReporteEvaluacionGeneralQuery } from '../port/reporte-evaluacion-general.port';
import { finalize } from 'rxjs';
import { RepoResource } from '@shared/type/repo-resource';
import { EvaluacionDocenteMateria } from '../read-model/evaluacion-docente-materia.model';

@Injectable()
export class EvaluacionGeneralDocenteFacade {
  private readonly reporteEvaluacionGeneralQuery = inject(ReporteEvaluacionGeneralQuery);
  readonly evaluacionGeneralDocenteList = signal<EvaluacionDocente[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly idPeriodo = signal<number | null>(null);

  getByIdPeriodo(idPeriodo: Signal<number | undefined>) {
    return this.reporteEvaluacionGeneralQuery.getByIdPeriodo(idPeriodo);
  }

  getByIdPeriodoIdDocente(idPeriodo: Signal<number | undefined>, idDocente: Signal<number | undefined>) {
    return this.reporteEvaluacionGeneralQuery.getByIdPeriodoIdDocente(idPeriodo, idDocente);
  }

  exportar(idPeriodoLectivo: number) {
      this.loading.set(true);
      this.reporteEvaluacionGeneralQuery.exportarExcel(idPeriodoLectivo)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
          next: blob => {
              this.error.set(null);
              this.descargar(blob, 'ReporteGeneralEvaluacionDocente.xlsx');
          },
          error: e => {
              this.error.set(e.message);
          }
      })   
  }

  exportarPdfDocente(idPeriodo: number, idDocente: number, nombreArchivo: string) {
      // La pestaña se abre antes de la petición para que el navegador no la bloquee como popup
      const ventana = window.open('', '_blank');
      this.loading.set(true);
      this.reporteEvaluacionGeneralQuery.exportarPdfDocente(idPeriodo, idDocente)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
          next: blob => {
              this.error.set(null);
              if (ventana == null) {
                  this.descargar(blob, nombreArchivo);
                  return;
              }
              const url = window.URL.createObjectURL(blob);
              ventana.location.href = url;
              setTimeout(() => window.URL.revokeObjectURL(url), 60_000);
          },
          error: e => {
              ventana?.close();
              this.error.set(e.message);
          }
      })
  }

  private descargar(blob: Blob, nombreArchivo: string) {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = nombreArchivo;
      link.click();
      window.URL.revokeObjectURL(link.href);
  }

  public getReporteDocenteMateriaByIdPeriodo(idPeriodo: Signal<number | undefined>): RepoResource<EvaluacionDocenteMateria[]>{
    return this.reporteEvaluacionGeneralQuery.getReporteDocenteMateriaByIdPeriodo(idPeriodo);
  }

}
