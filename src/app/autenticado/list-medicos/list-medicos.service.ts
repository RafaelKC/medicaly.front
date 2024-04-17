import { Injectable, Input } from '@angular/core';
import { ProfissionalInput } from '../../../tokens/models/profissional-input';
import { ensureTrailingSlash } from '../../../tokens/functions/ensure-trailing-slash';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetProfissionaisOutput } from '../../../tokens/models/get-profissionais-output';

@Injectable(
)
export class ListMedicosService {


  public getProfissionais(maxResultCount?: number): Observable<GetProfissionaisOutput> {
    let params = new HttpParams();
    if (maxResultCount) {
      params = params.set('maxResultCount', maxResultCount.toString());
    }
    return this.http.get<GetProfissionaisOutput>(this.basePath, { params });
  }

  public get basePath(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}profissionais`;
  }
  constructor(private http: HttpClient) { }
}
