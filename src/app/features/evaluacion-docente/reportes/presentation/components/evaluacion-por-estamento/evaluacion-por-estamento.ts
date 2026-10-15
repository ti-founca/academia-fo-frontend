import { Component, computed, inject, input } from '@angular/core';
import componentConfig from './component.config';
import { EstamentoFacade } from '@features/evaluacion-docente/reportes/application/facade/estamento.facade';
import { ReporteIndicadorFacade } from '@features/evaluacion-docente/reportes/application/facade/reporte-indicador.facade';
import { Indicador } from '@features/evaluacion-docente/reportes/application/read-model/indicador.model';
import { TipoDocente } from '@features/evaluacion-docente/reportes/domain/model/tipo-docente.model';

interface IndicadorPromedio {
  indicador: Indicador;
  promedio: number;
  cantidad: number;
}

interface GrupoTipoDocente {
  tipoDocente: TipoDocente;
  indicadores: IndicadorPromedio[];
  promedio: number;
}

interface Acumulador {
  suma: number;
  cantidad: number;
}

@Component({
  selector: 'acadfo-evaluacion-por-estamento',
  imports: componentConfig.imports,
  providers: componentConfig.providers,
  templateUrl: './evaluacion-por-estamento.html',
  styleUrl: './evaluacion-por-estamento.less',
})
export class EvaluacionPorEstamento {
  readonly estamentoFacade = inject(EstamentoFacade);
  readonly reporteIndicadorFacade = inject(ReporteIndicadorFacade);

  readonly idPeriodo = input<number | undefined>();
  readonly idTipoDocente = input<number | undefined>();
  private readonly puntajesResource = this.reporteIndicadorFacade.getPuntajesPorIndicador(this.idPeriodo, this.idTipoDocente);
  readonly isLoading = computed(() => this.puntajesResource.isLoading());
  readonly exportarDisabled = computed(() => (this.puntajesResource.value() ?? []).length === 0);

  // idEstamento → indicadores agrupados por tipo de docente.
  // Los promedios se ponderan por cantidad: con filtro de tipo de docente el backend
  // devuelve una fila por evaluado y hay que combinarlas por indicador.
  readonly reportePorEstamento = computed<Map<number, GrupoTipoDocente[]>>(() => {
    const porEstamento = new Map<number, Map<number, { tipoDocente: TipoDocente, indicadores: Map<number, { indicador: Indicador } & Acumulador> }>>();
    for (const p of this.puntajesResource.value() ?? []) {
      const porTipoDocente = porEstamento.get(p.estamento.id) ?? new Map();
      porEstamento.set(p.estamento.id, porTipoDocente);
      const grupo = porTipoDocente.get(p.tipoDocente.id) ?? { tipoDocente: p.tipoDocente, indicadores: new Map() };
      porTipoDocente.set(p.tipoDocente.id, grupo);
      const acc = grupo.indicadores.get(p.indicador.id) ?? { indicador: p.indicador, suma: 0, cantidad: 0 };
      acc.suma += p.promedio * p.cantidad;
      acc.cantidad += p.cantidad;
      grupo.indicadores.set(p.indicador.id, acc);
    }

    const resultado = new Map<number, GrupoTipoDocente[]>();
    for (const [idEstamento, porTipoDocente] of porEstamento) {
      const grupos = [...porTipoDocente.values()]
        .sort((a, b) => a.tipoDocente.id - b.tipoDocente.id)
        .map(grupo => {
          const accs = [...grupo.indicadores.values()].sort((a, b) => a.indicador.nroOrden - b.indicador.nroOrden);
          const total = accs.reduce((t, a) => ({ suma: t.suma + a.suma, cantidad: t.cantidad + a.cantidad }), { suma: 0, cantidad: 0 });
          return {
            tipoDocente: grupo.tipoDocente,
            indicadores: accs.map(a => ({ indicador: a.indicador, promedio: this.promedio(a), cantidad: a.cantidad })),
            promedio: this.promedio(total)
          };
        });
      resultado.set(idEstamento, grupos);
    }
    return resultado;
  });

  constructor() {
    this.estamentoFacade.sort.set({ orders: [{ field: "id", direction: "asc" }] });
    this.estamentoFacade.pageSize.set(50);
  }

  exportarEvaluacionPorEstamento() {
    const idPeriodo = this.idPeriodo();
    if (idPeriodo == null) return;
    this.reporteIndicadorFacade.exportar(idPeriodo, this.idTipoDocente());
  }

  private promedio(acc: Acumulador): number {
    return acc.cantidad > 0 ? acc.suma / acc.cantidad : 0;
  }
}
