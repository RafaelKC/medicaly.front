import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ensureTrailingSlash } from '../../../../tokens/functions/ensure-trailing-slash';
import { GetProfissionalOutput } from '../../../../tokens/models/get-profissional-output';
import { ProfissionalInput } from '../../../../tokens/models/profissional-input';

@Injectable({
  providedIn: 'root'
})
export class SelecionarHorarioService {


  public getProfissionais(id: string): Observable<ProfissionalInput> {
    return this.http.get<ProfissionalInput>(this.basePath);
  }

  public get basePath(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}profissionais`;
  }
  constructor(private http: HttpClient) { }
}
