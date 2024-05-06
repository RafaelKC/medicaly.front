import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProcedimentoInput } from '../../../tokens/models/procedimento';
import { environment } from '../../../environments/environment';
import { ensureTrailingSlash } from '../../../tokens/functions/ensure-trailing-slash';
import { PacienteOutput } from '../../../tokens/models/paciente-output';

@Injectable({
  providedIn: 'root'
})
export class VerAgendamentoService {

  constructor(private http:HttpClient) { }

  public getAgendamentos(maxResultCount?: number): Observable<ProcedimentoInput>{
    let params = new HttpParams();
    if (maxResultCount) {
      params = params.set('maxResultCount', maxResultCount.toString());
    }
    return this.http.get<ProcedimentoInput>(this.basePathProcedimento, { params });
  }

  public get basePathProcedimento(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}procedimento`;
  }

}
