import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TelaCadastroComponent} from './tela-cadastro.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {MatButton} from "@angular/material/button";
import {MatRadioModule} from '@angular/material/radio';
import { UserInfoComponent } from './user-info/user-info.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CepServiceService } from '../../../app/cep-service.service';



@NgModule({
  declarations: [TelaCadastroComponent, UserInfoComponent, EnderecoComponent],
  exports: [TelaCadastroComponent],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButton,
    MatRadioModule,
    HttpClientModule
  ],
  providers: [
    provideNativeDateAdapter(),
    CepServiceService,
    HttpClient,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})
export class TelaCadastroModule { }
