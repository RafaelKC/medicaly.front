import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ensureTrailingSlash} from "../../../tokens/functions/ensure-trailing-slash";
import {environment} from "../../../environments/environment";
import {EspecialidadeModel} from "../../../tokens/models/especialidade-model";

@Injectable()
export class CadastroEspecialidadeService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public create(input: EspecialidadeModel): Observable<any> {
    return this.httpClient.post<any>(this.basePath, input);
  }

  public update(id: string, input: EspecialidadeModel): Observable<any> {
    return this.httpClient.put<any>(this.basePath + `/${id}`, input);
  }

  public getById(id: string): Observable<EspecialidadeModel> {
    return this.httpClient.get<EspecialidadeModel>(this.basePath + `/${id}`);
  }

  public get basePath(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}especialidades`;
  }
}
