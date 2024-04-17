import {Component, OnDestroy, OnInit} from '@angular/core';
import {TableLazyLoadEvent, TableModule} from "primeng/table";
import {
  Genero,
  PacienteInput,
  stringIsNullOrEmptyOrWhitespace,
  SubscriptionsManagerUtil,
  TELEFONE_MASK
} from "../../../../tokens";
import {DatePipe, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {DashboardPacientesServiceService} from "./dashboard-pacientes-service.service";
import {FilteredInput} from "../../../../tokens/models/paged-filtered-input";
import {debounceTime, filter, first, Subscription} from "rxjs";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-pacientes',
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
  templateUrl: './dashboard-pacientes.component.html',
  styleUrl: './dashboard-pacientes.component.scss'
})
export class DashboardPacientesComponent implements OnInit, OnDestroy {
  public carregado = false;
  public pacientes: Array<PacienteInput>;

  public maxRows = 20;
  public generos = Genero;
  public totalPacientes: number;
  public carregandoPaciente = true;

  public filtroControl = new FormControl<string>('');

  private subs = new SubscriptionsManagerUtil();

  constructor(
    private service: DashboardPacientesServiceService,
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

  }

  public delete(id: string): void {
    this.service.delete(id).pipe(first())
      .subscribe({
        next: result => {
          this.setPacientes();
        }
      })
  }


  public edit(id: string): void {
    this.router.navigate([`auth/editar-paciente/${id}`])
  }

  public setPacientes(evento?: TableLazyLoadEvent) {
    this.carregandoPaciente = true
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
          this.pacientes = pagedResult.items;
          this.totalPacientes = pagedResult.totalCount;
          this.carregandoPaciente = false;
        })
      })
  }


  private initSubtFiltro(): void {
    const sub = this.filtroControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe({
        next: (v) => {
          this.setPacientes();
        }
      })
  }
}
