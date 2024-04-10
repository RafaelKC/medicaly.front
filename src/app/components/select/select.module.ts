import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MultiSelectComponent} from "./multi-select.component";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {PaginatorModule} from "primeng/paginator";



@NgModule({
  declarations: [MultiSelectComponent],
  exports: [MultiSelectComponent],
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
    ]
})
export class SelectModule { }
