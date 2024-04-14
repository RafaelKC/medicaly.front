import { Injectable } from '@angular/core';
import {ensureTrailingSlash} from "../../../tokens/functions/ensure-trailing-slash";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateProfissionalInput} from "../../../tokens/models/create-profissional-input";

@Injectable()
export class CreateProfissionalService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public create(input: CreateProfissionalInput): Observable<any> {
    return this.httpClient.post<any>(this.basePath, input);
  }

  public get basePath(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}profissionais`;
  }
}
