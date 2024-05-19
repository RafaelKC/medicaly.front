import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProcedimentoOutput} from "../../../../tokens/models/procedimento-output";
import {ensureTrailingSlash} from "../../../../tokens/functions/ensure-trailing-slash";
import {environment} from "../../../../environments/environment";

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
}
