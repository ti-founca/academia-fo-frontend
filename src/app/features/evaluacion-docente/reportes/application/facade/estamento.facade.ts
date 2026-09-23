import { computed, Injectable, Signal, signal } from '@angular/core';
import { PageRequest } from '@shared/pagination/page-request.model';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, finalize, switchMap } from 'rxjs';
import { Sort } from '@shared/pagination/sort.model';
import { PaginatedResponse } from '@shared/pagination/paginated-response.model';
import { Estamento } from '../../domain/model/estamento.model';
import { EstamentoRepository } from '../../domain/repository/estamento.repository';

@Injectable()
export class EstamentoFacade {
  readonly emptyPage: PaginatedResponse<Estamento> = { content: [], page: 0, size: 0, totalElements: 0, totalPages: 0}
  readonly currentPage = signal<PaginatedResponse<Estamento>>(this.emptyPage);
  readonly estamentoList = signal<Estamento[]>([]);
  
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

  constructor(private repository: EstamentoRepository) {
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
          this.estamentoList.set(response.content);
        else
          this.estamentoList.set([...this.estamentoList(), ...response.content]);
      },
    })
  }

  public loadNextPage(){
    if(this.currentPage().page >= this.currentPage().totalPages) return;
    this.loadMore = true
    this.page.set(this.page() + 1);
  }
}