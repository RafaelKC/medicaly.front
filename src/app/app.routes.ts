import {Routes} from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {TelaCadastroComponent} from '../components/pacientes/tela-cadastro/tela-cadastro.component';

export const routes: Routes = [
    {path: "cadastro-paciente", component: TelaCadastroComponent},
    {path:"login", component:LoginComponent}
];
