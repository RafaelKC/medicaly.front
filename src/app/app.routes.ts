import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: "notAuth", loadChildren: () => import('./nao-autenticado/nao-autenticado-routing.module').then(m => m.NaoAutenticadoRoutingModule)},
  { path: "auth", loadChildren: () => import('./autenticado/autenticado-routing.module').then(m => m.AutenticadoRoutingModule)},
  { path: "", loadChildren: () => import('./generico-autenticacao/generico-autenticacao-routing.module').then(m => m.GenericoAutenticacaoRoutingModule)},
  {
    path: '**',
    redirectTo: 'home'
  },
];
