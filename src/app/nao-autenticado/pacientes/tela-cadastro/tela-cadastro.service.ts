import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PacienteInput } from '../../../../tokens';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TelaCadastroService { 
  constructor( private httpClient:HttpClient) { }

  public createPaciente(paciente: PacienteInput):Observable<PacienteInput[]>{
    return this.httpClient.post<PacienteInput[]>(environment.apiUrl, paciente)
  }
}
