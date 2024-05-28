import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListMedicosComponent} from './list-medicos.component';
import {ListMedicosService} from './list-medicos.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {HttpMedicalyModule} from "../../http-medicaly.module";


const routes: Routes = [
  { path: '', component: ListMedicosComponent }
];

@NgModule({
  declarations: [ListMedicosComponent],
  exports:[RouterModule],
  imports: [
    HttpMedicalyModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule
  ],
  providers:[ListMedicosService]
})
export class ListMedicosModule { }
