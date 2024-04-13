import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {TimerSelectComponent} from "./timer-select.component";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelect} from "@angular/material/select";



@NgModule({
  declarations: [TimerSelectComponent],
  imports: [
    CommonModule,
    NgxMaterialTimepickerModule.setOpts('pt-Br', 'portuguese'),
    MatFormField,
    MatInput,
    MatLabel,
    PaginatorModule,
    ReactiveFormsModule,
    MatSelect,
  ],
  exports: [TimerSelectComponent],
})
export class TimeSelectModule { }
