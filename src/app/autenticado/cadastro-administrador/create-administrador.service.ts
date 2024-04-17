import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ensureTrailingSlash} from "../../../tokens/functions/ensure-trailing-slash";
import {environment} from "../../../environments/environment";
import {CreateAdministradorInput} from "../../../tokens/models/create-administrador-input";
import {AdministradorModel} from "../../../tokens/models/administrador-model";

@Injectable()
export class CreateAdministradorService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public create(input: CreateAdministradorInput): Observable<any> {
    return this.httpClient.post<any>(this.basePath, input);
  }

  public update(id: string, input: AdministradorModel): Observable<any> {
    return this.httpClient.put<any>(this.basePath + `/${id}`, input);
  }

  public get(id: string): Observable<AdministradorModel> {
    return this.httpClient.get<AdministradorModel>(this.basePath + `/${id}`);
  }

  public get basePath(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}administradores`;
  }
}
