import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {authGuard} from "./auth.guard";
import {tipoUsuarioGuard} from "./tipo-usuario.guard";
import {UserTipo} from "../../tokens";


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
        path: 'cadastro-administrador',
        loadChildren: () => import('./cadastro-administrador/cadastro-administrador.module').then(m => m.CadastroAdministradorModule),
        canActivate: [tipoUsuarioGuard([UserTipo.Administrador])],
      },
      {
        path: 'dashboard-adm',
        loadChildren: () => import('./dashboard-adm/dashboard-adm.module').then(m => m.DashboardAdmModule),
        canActivate: [tipoUsuarioGuard([UserTipo.Administrador])],
      },
      {
        path: 'list-medicos',
        loadChildren: () => import('./list-medicos/list-medicos.module').then(m => m.ListMedicosModule)
      },
      {
        path: 'selecionar-horario/:id',
        loadChildren: () => import('./list-medicos/selecionar-horario/selecionar-horario.module').then(m => m.SelecionarHorarioModule)
      },
      {
        path: `editar-profissional/:id`,
        loadChildren: () => import('./cadastro-profissional/cadastro-profissional.module').then(m => m.CadastroProfissionalModule),
        canActivate: [tipoUsuarioGuard([UserTipo.Administrador])],
      },
      {
        path: `editar-administrador/:id`,
        loadChildren: () => import('./cadastro-administrador/cadastro-administrador.module').then(m => m.CadastroAdministradorModule),
        canActivate: [tipoUsuarioGuard([UserTipo.Administrador])],
      },
      {
        path: `editar-paciente/:id`,
        loadChildren: () => import('../nao-autenticado/pacientes/tela-cadastro/tela-cadastro.module').then(m => m.TelaCadastroModule),
        canActivate: [tipoUsuarioGuard([UserTipo.Administrador])]
      },
      {
        path: `editar-unidade/:id`,
        loadChildren: () => import('../components/unidade-form/unidade-form.module').then(m => m.UnidadeFormModule)
      },
      {
        path: `ver-agendamento`,
        loadChildren: () => import('./ver-agendamento-paciente/ver-agendamento-paciente.module').then(m => m.VerAgendamentoPacienteModule),
        canActivate: [tipoUsuarioGuard([UserTipo.Paciente])],
      },
      {
        path: `meus-procedimentos/:id`,
        loadChildren: () => import('./ver-agendamento-paciente/meus-procedimentos/meus-procedimentos.module').then(m => m.MeusProcedimentosModule),
      },
      {
        path: `especialidade`,
        canActivate: [tipoUsuarioGuard([UserTipo.Administrador])],
        children: [
          {
            path: '',
            loadChildren: () => import('./cadastro-especialidade/cadastro-especialidade.module').then(m => m.CadastroEspecialidadeModule),
          },
          {
            path: ':id',
            loadChildren: () => import('./cadastro-especialidade/cadastro-especialidade.module').then(m => m.CadastroEspecialidadeModule),
          },
          {
            path: '*',
            redirectTo: ''
          }
        ]
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
