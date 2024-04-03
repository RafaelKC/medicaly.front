import {Injectable} from '@angular/core';
import {LoginInput, LoginOutput, UserTipo} from "../../../tokens";
import {ensureTrailingSlash} from "../../../tokens/functions/ensure-trailing-slash";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class LoginService {

  constructor(
      private httpClient: HttpClient
  ) { }

  public login(input: LoginInput, tipoUsuario: UserTipo): Observable<LoginOutput> {
    let params = new HttpParams();
    params = params.set('tipoUsuario', tipoUsuario)

    return this.httpClient.post<LoginOutput>(this.basePath, input, { params })
  }

  public get basePath(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}auth/login`;
  }
}
