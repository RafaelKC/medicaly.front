import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ensureTrailingSlash} from "../../../tokens/functions/ensure-trailing-slash";
import {environment} from "../../../environments/environment";
import {ResultadoInput} from "../../../tokens/models/resultado-input";
import {ResultadoAnexoInput} from "../../../tokens/models/resultado-anexo-input";


@Injectable()
export class ResultadoService {
  public get basePath(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}resultados`;
  }

  public get basePathRA(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}resultadoAnexo`;
  }



  constructor(private http: HttpClient ) { }

  public create(input: ResultadoInput): Observable<any> {
    return this.http.post<any>(this.basePath, input);
  }

  createResultadoAnexo(input: ResultadoAnexoInput): Observable<any> {
    return this.http.post<any>(this.basePathRA, input);
  }

}
