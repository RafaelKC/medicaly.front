import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ensureTrailingSlash } from '../../../../tokens/functions/ensure-trailing-slash';
import { ProfissionalInput } from '../../../../tokens/models/profissional-input';
import {ProcedimentoInput} from "../../../../tokens/models/procedimento";

@Injectable()
export class SelecionarHorarioService {


  public getProfissional(id: string): Observable<ProfissionalInput> {
    const url = `${this.basePathProfissionais}/${id}`
    return this.http.get<ProfissionalInput>(url);
  }

  public get basePathProfissionais(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}profissionais`;
  }

  public get basePathProcedimento(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}procedimentos`;
  }

  public createProcedimento(procedimento:ProcedimentoInput): Observable<any> {
    return this.http.post<any>(this.basePathProcedimento, procedimento);
  }


  constructor(private http: HttpClient) { }
}
