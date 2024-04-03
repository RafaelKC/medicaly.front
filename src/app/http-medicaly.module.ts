import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {httpInterceptorsProvider} from "./interceptors";


@NgModule({
  exports: [HttpClientModule],
  imports: [
    HttpClientModule
  ],
  providers: [
    httpInterceptorsProvider,
    HttpClient
  ]
})
export class HttpMedicalyModule { }
