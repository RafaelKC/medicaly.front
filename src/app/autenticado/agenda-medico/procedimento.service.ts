import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ProcedimentoInput} from "../../../tokens/models/procedimento";
import {Observable} from "rxjs";
import {ensureTrailingSlash} from "../../../tokens/functions/ensure-trailing-slash";
import {environment} from "../../../environments/environment";


@Injectable()
export class ProcedimentoService {
  public get basePath(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}procedimentos`;
  }

  constructor(private http: HttpClient ) { }

  public update(id: string, input: ProcedimentoInput): Observable<any> {
    return this.http.put<any>(this.basePath + `/${id}`, input);
  }

}
