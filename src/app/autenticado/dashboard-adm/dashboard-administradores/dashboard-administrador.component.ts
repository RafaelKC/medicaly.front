import {Component, OnDestroy, OnInit} from '@angular/core';
import {TableLazyLoadEvent, TableModule} from "primeng/table";
import {
  AuthenticationService,
  Genero,
  stringIsNullOrEmptyOrWhitespace,
  SubscriptionsManagerUtil
} from "../../../../tokens";
import {DatePipe, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {DashboardAdministradoresServiceService} from "./dashboard-administradores-service.service";
import {FilteredInput} from "../../../../tokens/models/paged-filtered-input";
import {debounceTime, first} from "rxjs";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpMedicalyModule} from "../../../http-medicaly.module";
import {AdministradorModel} from "../../../../tokens/models/administrador-model";

@Component({
  selector: 'app-dashboard-administrador',
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
    HttpMedicalyModule
  ],
  templateUrl: './dashboard-administrador.component.html',
  styleUrl: './dashboard-administrador.component.scss'
})
export class DashboardAdministradorComponent implements OnInit, OnDestroy {
  public carregado = false;
  public administradorse: Array<AdministradorModel>;

  public maxRows = 20;
  public generos = Genero;
  public totalAdministrador: number;
  public carregandoAdministrador = true;

  public filtroControl = new FormControl<string>('');

  private subs = new SubscriptionsManagerUtil();

  constructor(
    private service: DashboardAdministradoresServiceService,
    private router: Router,
    private auth: AuthenticationService,
    ) {
  }

  public get currentUserId(): string {
    return `${this.auth.user?.id}`;
  }

  public ngOnInit(): void {
    this.initSubtFiltro();
    this.carregado = true;
  }

  public ngOnDestroy(): void {
    this.subs.clear();
  }

  public add(): void {
    this.router.navigate(['/auth/cadastro-administrador'])
  }

  public delete(id: string): void {
    this.service.delete(id).pipe(first())
      .subscribe({
        next: result => {
          this.setAdministradores();
        }
      })
  }


  public edit(id: string): void {

  }

  public setAdministradores(evento?: TableLazyLoadEvent) {
    this.carregandoAdministrador = true
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
          this.administradorse = pagedResult.items;
          this.totalAdministrador = pagedResult.totalCount;
          this.carregandoAdministrador = false;
        })
      })
  }


  private initSubtFiltro(): void {
    const sub = this.filtroControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe({
        next: (v) => {
          this.setAdministradores();
        }
      })
  }
}
