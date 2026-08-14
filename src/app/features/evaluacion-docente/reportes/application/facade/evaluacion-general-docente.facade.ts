import { Injectable, signal } from '@angular/core';
import { EvaluacionGeneralDocenteRepository } from '../../domain/repository/evaluacion-general-docente.repository';
import { EvaluacionGeneralDocente } from '../../domain/model/evaluacion-general-docente.model';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, finalize, switchMap, tap } from 'rxjs';

@Injectable()
export class EvaluacionGeneralDocenteFacade {
  readonly evaluacionGeneralDocenteList = signal<EvaluacionGeneralDocente[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly idPeriodo = signal<number | null>(null);

  //private loadEvaluaciones$ = this.repository.getByIdPeriodo()
  constructor(private repository: EvaluacionGeneralDocenteRepository) {
    toObservable(this.idPeriodo)
      .pipe(
        switchMap(id => {
          if(id == null) return EMPTY;
          this.loading.set(true);
          return this.repository.getByIdPeriodo(id).pipe(
            catchError(err => {
              this.error.set(err.message);
              return EMPTY;
            }),
            finalize(() => this.loading.set(false))
          );
        }),
        takeUntilDestroyed()
      ).subscribe({
      next: data => {
        this.error.set(null);
        this.evaluacionGeneralDocenteList.set(data);
      }
    });
  }

  downloadExcel(){
    this.repository
  }

}
