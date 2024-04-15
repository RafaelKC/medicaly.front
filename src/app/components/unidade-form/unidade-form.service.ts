import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnidadeAtendimentoInput } from '../../../tokens/models/unidade-atendimento-input';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ensureTrailingSlash } from '../../../tokens/functions/ensure-trailing-slash';
import { CreateUnidadeInput } from '../../../tokens/models/create-unidade-input';

@Injectable({
  providedIn: 'root'
})
export class UnidadeFormService {

  constructor(private http: HttpClient ) { }

  public create(input: CreateUnidadeInput): Observable<any> {
    return this.http.post<any>(this.basePath, input);
  }

  public get basePath(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}unidades-atendimento`;
  }
}
