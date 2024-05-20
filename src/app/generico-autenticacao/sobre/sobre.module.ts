import {NgModule} from '@angular/core';
import {SobreComponent} from "./sobre.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', component: SobreComponent }
];

@NgModule({
  declarations: [SobreComponent],
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
  
})
export class SobreModule { }

