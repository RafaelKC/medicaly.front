import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { TelaCadastroComponent } from './pacientes/tela-cadastro/tela-cadastro.component';

export const routes: Routes = [
    {path: "", component: TelaCadastroComponent},
    {path:"login", component:LoginComponent}
];
