import {NgModule} from '@angular/core';
import {SobreComponent} from "./sobre.component";
import {RouterModule, Routes} from "@angular/router";
import { SobreComponentRoutingModule } from './sobre-routing.module';

const routes: Routes = [
  { path: 'sobre', component: SobreComponent }
];

@NgModule({
  declarations: [SobreComponent],
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
  
})
export class SobreModule { }

