import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthenticationInterceptor} from "./authentication.interceptor";
import {HttpErrorInterceptor} from "./http-error.interceptor";

export const httpInterceptorsProvider= [
  { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
]
