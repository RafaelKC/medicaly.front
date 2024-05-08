import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ensureTrailingSlash } from '../../../tokens/functions/ensure-trailing-slash';
import { GetProcedimentoOutput } from '../../../tokens/models/get-procedimento-output';

@Injectable({
  providedIn: 'root'
})
export class VerAgendamentoService {

  constructor(private http:HttpClient) { }

  public getAgendamentos(maxResultCount?: number): Observable<GetProcedimentoOutput>{
    let params = new HttpParams();
    if (maxResultCount) {
      params = params.set('maxResultCount', maxResultCount.toString());
    }
    return this.http.get<GetProcedimentoOutput>(this.basePathProcedimento, { params });
  }

  public cancelar(id:string): Observable<any>{
    return this.http.delete<any>(this.basePathProcedimento + `/${id}`)
  }

  public get basePathProcedimento(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}procedimentos`;
  }

}
