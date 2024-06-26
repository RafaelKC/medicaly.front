import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ensureTrailingSlash} from '../../../tokens/functions/ensure-trailing-slash';
import {GetListProcedimentoInput} from "../../../tokens/models/get-list-procedimento-input";
import {PagedResult} from "../../../tokens/models/paged-result";
import {ProcedimentoOutput} from "../../../tokens/models/procedimento-output";
import {ResultadoOutput} from "../../../tokens/models/resultadoOutput";
import {AnexoComLinkOutput} from "../../../tokens/models/anexos-com-link-output";

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

  public getResultado(id: string) : Observable<ResultadoOutput> {
    const url = this.basePathResultado + `/${id}`
    return this.http.get<ResultadoOutput>(url)
  }

  public getAnexo(id: string) : Observable<AnexoComLinkOutput> {
    const url = this.basePathAnexo + `/${id}`
    return this.http.get<AnexoComLinkOutput>(url)
  }

  public get basePathResultado(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}resultados`;
  }

  public get basePathAnexo(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}anexos`;
  }

  public deleta(id:string): Observable<any>{
    return this.http.delete<any>(this.basePathProcedimento + `/${id}`)
  }

  public update(id: string, procedimento: ProcedimentoOutput): Observable<any> {
    return this.http.put<any>(this.basePathProcedimento + `/${id}`, procedimento)
  }

  public get basePathProcedimento(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}procedimentos`;
  }

}
