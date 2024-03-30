import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

export class EnderecoResult {
  public cep: string;
  public logradouro: string;
  public complemento: string;
  public bairro: string;
  public localidade: string;
  public uf: string;
  public ibge: string;
}

@Injectable({
  providedIn: 'root'
})
export class CepServiceService {

  constructor(private httpClient: HttpClient) { }

  public buscarEndereco(cep: string): Observable<EnderecoResult> {
    return this
      .httpClient.get<EnderecoResult>(`https://viacep.com.br/ws/${cep}/json/`)

  }
}
