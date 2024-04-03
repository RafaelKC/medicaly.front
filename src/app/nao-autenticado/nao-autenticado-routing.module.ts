import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {notAuthGuard} from "./not-auth.guard";

const routes: Routes = [
  {
    path: '',
    canActivate: [notAuthGuard],
    children: [
      {path: "login", loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
      {path: "cadastro-paciente", loadChildren: () => import('./pacientes/tela-cadastro/tela-cadastro.module').then(m => m.TelaCadastroModule)},
      {
        path: '**',
        redirectTo: 'login'
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
export class NaoAutenticadoRoutingModule { }
