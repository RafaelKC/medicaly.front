import { Injectable } from '@angular/core';
import {ensureTrailingSlash} from "../../../tokens/functions/ensure-trailing-slash";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateProfissionalInput} from "../../../tokens/models/create-profissional-input";
import {ProfissionalOutput} from "../../../tokens/models/profissional-output";
import {ProfissionalInput} from "../../../tokens/models/profissional-input";

@Injectable()
export class CreateProfissionalService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public create(input: CreateProfissionalInput): Observable<any> {
    return this.httpClient.post<any>(this.basePath, input);
  }

  public update(id: string, input: ProfissionalInput): Observable<any> {
    return this.httpClient.put<any>(this.basePath + `/${id}`, input);
  }

  public getById(id: string): Observable<ProfissionalOutput> {
    return this.httpClient.get<ProfissionalOutput>(this.basePath + `/${id}`);
  }

  public get basePath(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}profissionais`;
  }
}
