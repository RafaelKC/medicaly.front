import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EnderecoFormComponent} from "./endereco-form.component";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {IMaskDirective} from "angular-imask";
import {HttpClient} from "@angular/common/http";
import {CepServiceService} from "../../../tokens/services/cep-service.service";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [EnderecoFormComponent],
  exports: [EnderecoFormComponent],
  imports: [
    CommonModule,
    MatFormField,
    ReactiveFormsModule,
    IMaskDirective,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  providers: [
    HttpClient,
    CepServiceService,
  ]
})
export class EnderecoFormModule { }
