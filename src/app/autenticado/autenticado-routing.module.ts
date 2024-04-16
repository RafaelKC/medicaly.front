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
      },
      {
        path: 'list-medicos',
        loadChildren: () => import('./list-medicos/list-medicos.module').then(m => m.ListMedicosModule)
      },
      {
        path: 'selecionar-horario',
        loadChildren: () => import('./list-medicos/selecionar-horario/selecionar-horario.module').then(m => m.SelecionarHorarioModule)
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
