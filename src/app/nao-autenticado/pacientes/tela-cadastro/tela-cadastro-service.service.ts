import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PacienteInput } from '../../../../tokens';

@Injectable({
  providedIn: 'root'
})
export class TelaCadastroServiceService {
  url = "http://localhost:5010/"

  constructor(private httpClient: HttpClient) { }

  public addLivro(paciente: PacienteInput): Observable<PacienteInput[]> {
    return this.httpClient.post<PacienteInput[]>(this.url, paciente);
  }
}
