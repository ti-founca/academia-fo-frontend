import { inject, Injectable, Signal, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { RepoResource } from '@shared/type/repo-resource';
import { ReporteIndicadorQuery } from '../port/reporte-indicador.port';
import { PuntajePorIndicador } from '../read-model/puntaje-por-indicador.model';

@Injectable()
export class ReporteIndicadorFacade {
  private readonly reporteIndicadorQuery = inject(ReporteIndicadorQuery);
  readonly exportando = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  getPuntajesPorIndicador(idPeriodo: Signal<number | undefined>, idTipoDocente: Signal<number | undefined>): RepoResource<PuntajePorIndicador[]> {
    return this.reporteIndicadorQuery.getByIdPeriodo(idPeriodo, idTipoDocente);
  }

  exportar(idPeriodo: number, idTipoDocente?: number) {
    this.exportando.set(true);
    this.reporteIndicadorQuery.exportarExcel(idPeriodo, idTipoDocente)
    .pipe(finalize(() => this.exportando.set(false)))
    .subscribe({
      next: blob => {
        this.error.set(null);
        this.descargar(blob, 'ReportePorEstamento.xlsx');
      },
      error: e => {
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
}
