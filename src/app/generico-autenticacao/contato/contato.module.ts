import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContatoComponent} from './contato.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButton, MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {IMaskModule} from 'angular-imask';
import {RadioButtonModule} from 'primeng/radiobutton';
import {MatIconModule} from '@angular/material/icon';
import {ContatoRoutingModule} from "./contato-routing.module";


@NgModule({
  declarations: [ContatoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    MatRadioModule,
    IMaskModule,
    RadioButtonModule,
    MatButtonModule,
    MatIconModule,
    MatIconButton,
    ContatoRoutingModule
  ],
})
export class ContatoModule { }
