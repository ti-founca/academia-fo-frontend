import { Injectable, signal } from "@angular/core";
import { EvaluacionGeneralDocenteExporter } from "../port/evaluacion-general-docente-exporter.port";
import { finalize } from "rxjs";

@Injectable()
export class EvaluacionGeneralDocenteExporterFacade {
    readonly loading = signal<boolean>(false);
    readonly error = signal<string | null>(null)

    constructor(private exporter: EvaluacionGeneralDocenteExporter){ }

    exportar(idPeriodoLectivo: number) {
        this.loading.set(true);
        this.exporter.getReporteByIdPeriodo(idPeriodoLectivo)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
            next: blob => {
                this.error.set(null);
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'ReporteGeneralEvaluacionDocente.xlsx';
                link.click();
                window.URL.revokeObjectURL(link.href)
            },
            error: e => {
                this.error.set(e.message);
            }
        })   
    }
}