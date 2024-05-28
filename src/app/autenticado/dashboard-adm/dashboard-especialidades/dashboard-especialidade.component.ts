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
import {DashboardEspecialidadeService} from "./dashboard-especialidade.service";
import {EspecialidadeModel} from "../../../../tokens/models/especialidade-model";

@Component({
  selector: 'app-dashboard-especialidades',
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
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard-especialidade.component.html',
  styleUrl: './dashboard-especialidade.component.scss'
})
export class DashboardEspecialidadeComponent implements OnInit, OnDestroy {
  public carregado = false;
  public especialidades: Array<EspecialidadeModel>;

  public maxRows = 20;
  public totalEspecialidade: number;
  public carregandoEspecialidades = true;

  public filtroControl = new FormControl<string>('');

  private subs = new SubscriptionsManagerUtil();

  constructor(
    private service: DashboardEspecialidadeService,
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
    this.router.navigate(['/auth/especialidade'])
  }

  public delete(id: string): void {
    this.service.delete(id).pipe(first())
      .subscribe({
        next: result => {
          this.setEspecialidades();
        }
      })
  }


  public edit(id: string): void {
    this.router.navigate([`auth/especialidade/${id}`])
  }

  public setEspecialidades(evento?: TableLazyLoadEvent) {
    this.carregandoEspecialidades = true
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
          this.especialidades = pagedResult.items;
          this.totalEspecialidade = pagedResult.totalCount;
          this.carregandoEspecialidades = false;
        })
      })
  }


  private initSubtFiltro(): void {
    const sub = this.filtroControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe({
        next: (v) => {
          this.setEspecialidades();
        }
      })
  }
}
