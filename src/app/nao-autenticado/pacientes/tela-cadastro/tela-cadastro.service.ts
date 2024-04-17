import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserInput, LoginOutput, PacienteInput } from '../../../../tokens';
import { environment } from '../../../../environments/environment';
import { ensureTrailingSlash } from '../../../../tokens/functions/ensure-trailing-slash';
import {UnidadeAtendimentoOutput} from "../../../../tokens/models/unidade-atendimento-output";
import {UnidadeAtendimentoInput} from "../../../../tokens/models/unidade-atendimento-input";
import {PacienteOutput} from "../../../../tokens/models/paciente-output";
@Injectable({
  providedIn: 'root'
})
export class TelaCadastroService {
  constructor( private httpClient:HttpClient) { }

  public createPaciente(paciente: CreateUserInput<PacienteInput>): Observable<LoginOutput> {
    return this.httpClient.post<LoginOutput>(this.basePathAuth, paciente);
  }

  public get(id: string): Observable<PacienteOutput> {
    return this.httpClient.get<PacienteOutput>(this.basePath + `/${id}`);
  }

  public update(id: string, input: PacienteInput): Observable<any> {
    return this.httpClient.put<any>(this.basePath + `/${id}`, input);
  }

  public get basePath(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}pacientes`;
  }

  public get basePathAuth(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}auth/paciente/register`;
  }
}
