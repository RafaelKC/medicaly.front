import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {authGuard} from "./auth.guard";


const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '**',
        redirectTo: 'abc'
      },
    ],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AutenticadoRoutingModule { }
