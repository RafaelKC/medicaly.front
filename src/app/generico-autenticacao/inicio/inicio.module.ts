import {NgModule} from '@angular/core';
import {InicioComponent} from "./inicio.component";
import {RouterModule, Routes} from "@angular/router";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";

const routes: Routes = [
  { path: '', component: InicioComponent }
];

@NgModule({
  declarations: [InicioComponent],
  exports: [RouterModule],
    imports: [RouterModule.forChild(routes), MatFabButton, MatIcon, NgIf],
})
export class InicioModule { }

