import { computed, Injectable, Signal, signal } from '@angular/core';
import { PeriodoLectivoRepository } from '../../domain/repository/periodo-lectivo.repository';
import { PageRequest } from '@shared/pagination/page-request.model';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, finalize, switchMap } from 'rxjs';
import { PeriodoLectivo } from '../../domain/model/periodo-lectivo.model';
import { Sort } from '@shared/pagination/sort.model';
import { PaginatedResponse } from '@shared/pagination/paginated-response.model';

@Injectable()
export class PeriodoLectivoFacade {
  readonly emptyPage: PaginatedResponse<PeriodoLectivo> = { content: [], page: 0, size: 0, totalElements: 0, totalPages: 0}
  readonly currentPage = signal<PaginatedResponse<PeriodoLectivo>>(this.emptyPage);
  readonly periodoLectivoList = signal<PeriodoLectivo[]>([]);
  
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly page = signal<number>(1);
  readonly pageSize = signal<number>(10);
  readonly sort = signal<Sort>({orders: [{field: "id", "direction": "desc"}]});
  readonly pageRequest: Signal<PageRequest> = computed(() => {
    return {
      sort: this.sort(),
      page: this.page(),
      size: this.pageSize()
    }
  })
  private loadMore: boolean = false;

  constructor(private repository: PeriodoLectivoRepository) {
    toObservable(this.pageRequest).pipe(
      switchMap(req => {
        this.loading.set(true);
        return this.repository.findAll(req).pipe(
          catchError(err => {
            this.error.set(err.message);
            return EMPTY;
          }),
          finalize(() => this.loading.set(false))
        )
      }),
      takeUntilDestroyed()
    ).subscribe({
      next: response => {
        this.error.set(null);
        this.currentPage.set(response);
        if(!this.loadMore)
          this.periodoLectivoList.set(response.content);
        else
          this.periodoLectivoList.set([...this.periodoLectivoList(), ...response.content]);
      },
    })
  }

  public loadNextPage(){
    if(this.currentPage().page >= this.currentPage().totalPages) return;
    this.loadMore = true
    this.page.set(this.page() + 1);
  }
}