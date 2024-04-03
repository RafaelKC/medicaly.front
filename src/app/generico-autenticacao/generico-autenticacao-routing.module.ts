import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {
    path: '',
    children: [
      {path: "home", loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule)},
      {path: "contato", loadChildren: () => import('./contato/contato.module').then(m => m.ContatoModule)},
      {
        path: '**',
        redirectTo: 'home'
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
export class GenericoAutenticacaoRoutingModule { }
