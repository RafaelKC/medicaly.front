import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContatoComponent } from './contato.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { IMaskModule } from 'angular-imask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MatIconModule } from '@angular/material/icon';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', component: ContatoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContatoRoutingModule { }
