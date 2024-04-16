import {NgModule} from '@angular/core';
import {RouterLink, RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {httpInterceptorsProvider} from "../../interceptors";
import {HttpMedicalyModule} from "../../http-medicaly.module";
import { UnidadeFormComponent } from './unidade-form.component';
import { EnderecoFormModule } from "../endereco-form/endereco-form.module";
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';

const routes: Routes = [
  { path: '', component: UnidadeFormComponent }
];

@NgModule({
    declarations: [UnidadeFormComponent],
    exports: [RouterModule],
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioButton,
        RouterLink,
        RouterModule.forChild(routes),
        MatButton,
        NgIf,
        HttpMedicalyModule,
        EnderecoFormModule,
        MatRadioGroup
    ]
})
export class UnidadeFormModule {
}
