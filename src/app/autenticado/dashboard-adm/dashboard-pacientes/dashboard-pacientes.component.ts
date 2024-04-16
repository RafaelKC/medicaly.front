import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {Genero, PacienteInput, TELEFONE_MASK} from "../../../../tokens";
import {DatePipe, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-dashboard-pacientes',
  standalone: true,
  imports: [
    TableModule,
    NgIf,
    DatePipe,
    MatIcon,
    MatFabButton,
    MatIconButton
  ],
  templateUrl: './dashboard-pacientes.component.html',
  styleUrl: './dashboard-pacientes.component.scss'
})
export class DashboardPacientesComponent implements OnInit{
  public carregado = false;
  public pacientes: Array<PacienteInput>;

  public generos = Genero;

  public ngOnInit(): void {
  }

  protected readonly Genero = Genero;
}
