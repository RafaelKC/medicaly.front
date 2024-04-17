import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ensureTrailingSlash} from "../../../tokens/functions/ensure-trailing-slash";
import {environment} from "../../../environments/environment";
import {CreateAdministradorInput} from "../../../tokens/models/create-administrador-input";

@Injectable()
export class CreateAdministradorService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public create(input: CreateAdministradorInput): Observable<any> {
    return this.httpClient.post<any>(this.basePath, input);
  }

  public get basePath(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}administradores`;
  }
}
