import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ensureTrailingSlash} from "../../../../tokens/functions/ensure-trailing-slash";
import {environment} from "../../../../environments/environment";
import {FilteredInput} from "../../../../tokens/models/paged-filtered-input";
import {PagedResult} from "../../../../tokens/models/paged-result";
import {UnidadeAtendimentoOutput} from "../../../../tokens/models/unidade-atendimento-output";

@Injectable()
export class DashboardUnidadesServiceService {
  constructor(private httpClient:HttpClient) { }

  public getList(input: FilteredInput): Observable<PagedResult<UnidadeAtendimentoOutput>> {
    let params = new HttpParams();
    params = params.set('skipCount', input.skipCount)
    params = params.set('maxResultCount', input.maxResultCount)
    if(input.filter) {
      params = params.set('filter', input.filter)
    }

    return this.httpClient.get<PagedResult<UnidadeAtendimentoOutput>>(this.basePath, { params });
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.basePath + `/${id}`);
  }

  public get basePath(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}unidades-atendimento`;
  }
}
