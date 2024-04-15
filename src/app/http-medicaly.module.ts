import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {httpInterceptorsProvider} from "./interceptors";
import { UnidadeFormComponent } from './components/unidade-form/unidade-form.component';


@NgModule({
  exports: [HttpClientModule],
  imports: [
    HttpClientModule
  ],
  providers: [
    httpInterceptorsProvider,
    HttpClient
  ],
  declarations: [

  ]
})
export class HttpMedicalyModule { }
