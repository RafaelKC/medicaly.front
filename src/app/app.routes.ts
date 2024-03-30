import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path: "home", loadChildren: () => import('././nao-autenticado/inicio/inicio.module').then(m => m.InicioModule)},
  {path: "login", loadChildren: () => import('././nao-autenticado/login/login.module').then(m => m.LoginModule)},
  {path: "contato", loadChildren: () => import('././nao-autenticado/contato/contato.module').then(m => m.ContatoModule)},
  {path: "cadastro-paciente", loadChildren: () => import('././nao-autenticado/pacientes/tela-cadastro/tela-cadastro.module').then(m => m.TelaCadastroModule)},
  {
    path: '**',
    redirectTo: 'home'
  },
];
