import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserInput, LoginOutput, PacienteInput } from '../../../../tokens';
import { environment } from '../../../../environments/environment';
import { ensureTrailingSlash } from '../../../../tokens/functions/ensure-trailing-slash';
@Injectable({
  providedIn: 'root'
})
export class TelaCadastroService { 
  constructor( private httpClient:HttpClient) { }

  public createPaciente(paciente: CreateUserInput<PacienteInput>): Observable<LoginOutput> {
    return this.httpClient.post<LoginOutput>(this.basePath, paciente);
  }

  public get basePath(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}auth/paciente/register`;
  }
}
