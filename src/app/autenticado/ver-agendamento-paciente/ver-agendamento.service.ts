import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ensureTrailingSlash } from '../../../tokens/functions/ensure-trailing-slash';
import { GetProcedimentoOutput } from '../../../tokens/models/get-procedimento-output';
import {GetListProcedimentoInput} from "../../../tokens/models/get-list-procedimento-input";
import {PagedResult} from "../../../tokens/models/paged-result";
import {ProcedimentoOutput} from "../../../tokens/models/procedimento-output";
import {ProfissionalInput} from "../../../tokens/models/profissional-input";

@Injectable({
  providedIn: 'root'
})
export class VerAgendamentoService {

  constructor(private http:HttpClient) { }

  public getAgendamentos(input: GetListProcedimentoInput): Observable<PagedResult<ProcedimentoOutput>>{
    let params = new HttpParams();
    if (input.maxResultCount) {
      params = params.set('maxResultCount', input.maxResultCount);
    }
    if (input.pacienteId) {
      params = params.set('pacienteId', input.pacienteId);
    }
    if (input.filter) {
      params = params.set('filter', input.filter);
    }
    if (input.skipCount) {
      params = params.set('skipCount', input.skipCount);
    }
    return this.http.get<PagedResult<ProcedimentoOutput>>(this.basePathProcedimento, { params });
  }



  public cancelar(id:string): Observable<any>{
    return this.http.delete<any>(this.basePathProcedimento + `/${id}`)
  }

  public get basePathProcedimento(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}procedimentos`;
  }

}
