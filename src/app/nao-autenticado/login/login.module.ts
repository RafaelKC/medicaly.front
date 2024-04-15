import {NgModule} from '@angular/core';
import {RouterLink, RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {LoginComponent} from "./login.component";
import {MatButton} from "@angular/material/button";
import {LoginService} from "./login.service";
import {NgIf} from "@angular/common";
import {httpInterceptorsProvider} from "../../interceptors";
import {HttpMedicalyModule} from "../../http-medicaly.module";
import {ProgressSpinnerModule} from "primeng/progressspinner";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }
];

@NgModule({
  declarations: [LoginComponent],
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        RouterLink,
        RouterModule.forChild(routes),
        MatButton,
        NgIf,
        HttpMedicalyModule,
        ProgressSpinnerModule
    ],
  exports: [RouterModule],
  providers: [LoginService, httpInterceptorsProvider]
})
export class LoginModule {
}
