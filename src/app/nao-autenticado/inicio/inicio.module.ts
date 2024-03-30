import {NgModule} from '@angular/core';
import {InicioComponent} from "./inicio.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', component: InicioComponent }
];

@NgModule({
  declarations: [InicioComponent],
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class InicioModule { }
