import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProcedimentoOutput} from "../../../../tokens/models/procedimento-output";
import {ensureTrailingSlash} from "../../../../tokens/functions/ensure-trailing-slash";
import {environment} from "../../../../environments/environment";
import {ProfissionalOutput} from "../../../../tokens/models/profissional-output";

@Injectable({
  providedIn: 'root'
})
export class MeusProcedimentosService {

  constructor(private http: HttpClient) { }

  getProcedimento(id: string): Observable<ProcedimentoOutput>{
    const url = `${this.basePathProcedimento}/${id}`;
    return this.http.get<ProcedimentoOutput>(url);
  }

  public get basePathProcedimento(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}procedimentos`;
  }

  getProfissional(id: string) : Observable<ProfissionalOutput>{
    const url = `${this.basePathProfissional}/${id}`;
    return this.http.get<ProfissionalOutput>(url);
  }

  public get basePathProfissional(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}profissionais`;
  }
}
