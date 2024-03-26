import {Routes} from '@angular/router';
import {TelaCadastroComponent} from './nao-autenticado/pacientes/tela-cadastro/tela-cadastro.component';
import {LoginComponent} from "./nao-autenticado/login/login.component";

export const routes: Routes = [
    {path: "cadastro-paciente", component: TelaCadastroComponent},
    {path:"login", component:LoginComponent}
];
