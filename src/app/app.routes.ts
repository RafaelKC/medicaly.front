import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TelaCadastroComponent } from './pacientes/tela-cadastro/tela-cadastro.component';
import { InicioComponent } from './components/inicio/inicio.component';

export const routes: Routes = [
    {path: "", component: InicioComponent},
    {path: "cadastro", component: TelaCadastroComponent},
    {path:"login", component:LoginComponent}
];
