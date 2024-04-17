import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SobreComponent } from './sobre.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: SobreComponent }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes),
    CommonModule,RouterModule.forChild(routes),
  ]
})
export class SobreModule { }
