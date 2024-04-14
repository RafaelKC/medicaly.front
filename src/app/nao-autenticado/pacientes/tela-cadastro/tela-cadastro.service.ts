import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserInput, PacienteInput } from '../../../../tokens';
import { environment } from '../../../../environments/environment';
import { ensureTrailingSlash } from '../../../../tokens/functions/ensure-trailing-slash';
@Injectable({
  providedIn: 'root'
})
export class TelaCadastroService { 
  constructor( private httpClient:HttpClient) { }

  public createPaciente(paciente: CreateUserInput<PacienteInput>): Observable<CreateUserInput<PacienteInput>[]> {
    return this.httpClient.post<CreateUserInput<PacienteInput>[]>(this.basePath, paciente);
  }

  public get basePath(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}auth/paciente/register`;
  }
}
