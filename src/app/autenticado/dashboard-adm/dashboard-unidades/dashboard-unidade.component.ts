import {Component, OnDestroy, OnInit} from '@angular/core';
import {TableLazyLoadEvent, TableModule} from "primeng/table";
import {stringIsNullOrEmptyOrWhitespace, SubscriptionsManagerUtil} from "../../../../tokens";
import {DatePipe, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {FilteredInput} from "../../../../tokens/models/paged-filtered-input";
import {debounceTime, first} from "rxjs";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {UnidadeAtendimentoOutput} from "../../../../tokens/models/unidade-atendimento-output";
import {TipoUnidade} from "../../../../tokens/enums/tipo-unidade";
import {DashboardUnidadesServiceService} from "./dashboard-unidades-service.service";

@Component({
  selector: 'app-dashboard-unidades',
  standalone: true,
  imports: [
    TableModule,
    NgIf,
    DatePipe,
    MatIcon,
    MatFabButton,
    MatIconButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard-unidade.component.html',
  styleUrl: './dashboard-unidade.component.scss'
})
export class DashboardUnidadeComponent implements OnInit, OnDestroy {
  public carregado = false;
  public unidades: Array<UnidadeAtendimentoOutput>;

  public maxRows = 20;
  public tipos = TipoUnidade;
  public totalUnidade: number;
  public carregandoUnidades = true;

  public filtroControl = new FormControl<string>('');

  private subs = new SubscriptionsManagerUtil();

  constructor(
    private service: DashboardUnidadesServiceService,
    private router: Router
    ) {
  }

  public ngOnInit(): void {
    this.initSubtFiltro();
    this.carregado = true;
  }

  public ngOnDestroy(): void {
    this.subs.clear();
  }

  public add(): void {
    this.router.navigate(['/auth/cadastro-unidade'])
  }

  public delete(id: string): void {
    this.service.delete(id).pipe(first())
      .subscribe({
        next: result => {
          this.setUnidaes();
        }
      })
  }


  public edit(id: string): void {
    this.router.navigate([`auth/editar-unidade/${id}`])
  }

  public setUnidaes(evento?: TableLazyLoadEvent) {
    this.carregandoUnidades = true
    const filter = new FilteredInput();
    filter.maxResultCount = Number(this.maxRows);

    if (evento) {
      filter.skipCount = Number(evento.first);
    }

    const filtro = this.filtroControl.value;
    if (!stringIsNullOrEmptyOrWhitespace(filtro)) {
      filter.filter = `${filtro}`;
    }

    this.service.getList(filter).pipe(first())
      .subscribe({
        next: (pagedResult => {
          this.unidades = pagedResult.items;
          this.totalUnidade = pagedResult.totalCount;
          this.carregandoUnidades = false;
        })
      })
  }


  private initSubtFiltro(): void {
    const sub = this.filtroControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe({
        next: (v) => {
          this.setUnidaes();
        }
      })
  }
}
