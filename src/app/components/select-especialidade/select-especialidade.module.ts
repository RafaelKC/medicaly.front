import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectEspecialidadeComponent} from "./select-especialidade.component";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {PaginatorModule} from "primeng/paginator";
import {
  DashboardEspecialidadeService
} from "../../autenticado/dashboard-adm/dashboard-especialidades/dashboard-especialidade.service";


@NgModule({
  declarations: [SelectEspecialidadeComponent],
  exports: [SelectEspecialidadeComponent],
    imports: [
        CommonModule,
        MatFormField,
        MatSelect,
        MatChipsModule,
        MatOption,
        ReactiveFormsModule,
        MatIcon,
        MatSelectModule,
        PaginatorModule
    ],
  providers: [DashboardEspecialidadeService],
})
export class SelectEspecialidadeModule { }
