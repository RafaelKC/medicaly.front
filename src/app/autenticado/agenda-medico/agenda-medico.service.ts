import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PagedResult} from "../../../tokens/models/paged-result";
import {GetProfissionaisOutput} from "../../../tokens/models/get-profissionais-output";
import {ensureTrailingSlash} from "../../../tokens/functions/ensure-trailing-slash";
import {environment} from "../../../environments/environment";
import {ProcedimentoOutput} from "../../../tokens/models/procedimento-output";
import {GetListProcedimentoInput} from "../../../tokens/models/get-list-procedimento-input";



@Injectable({
  providedIn: 'root'
})
export class AgendaMedicoService {

  getProcedimento(input: GetListProcedimentoInput): Observable<PagedResult<ProcedimentoOutput>> {
    let params = new HttpParams();
    if (input.maxResultCount) {
      params = params.set('maxResultCount', input.maxResultCount);
    }
    if (input.filter) {
      params = params.set('filter', input.filter);
    }
    if (input.skipCount) {
      params = params.set('skipCount', input.skipCount);
    }
    if (input.profissionalId) {
      params = params.set('profissionalId', input.profissionalId);
    }

    return this.http.get<PagedResult<ProcedimentoOutput>>(this.basePath, { params });

  }
  public get basePath(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}procedimentos`;
  }
  constructor(private http: HttpClient) { }
}
