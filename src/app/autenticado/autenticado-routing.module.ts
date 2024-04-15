import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {authGuard} from "./auth.guard";



const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'cadastro-profissional',
        loadChildren: () => import('./cadastro-profissional/cadastro-profissional.module').then(m => m.CadastroProfissionalModule)
      },
      {
        path: 'cadastro-unidade',
        loadChildren: () => import('../components/unidade-form/unidade-form.module').then(m => m.UnidadeFormModule)
      }
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
