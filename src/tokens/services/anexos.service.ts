import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import {ensureTrailingSlash} from "../functions/ensure-trailing-slash";
import {environment} from "../../environments/environment";
import {AnexosCreatedOutput} from "../models/anexos-created-output";
import {AnexoInput} from "../models/anexos-input";

@Injectable({
  providedIn: 'root'
})
export class AnexosService {

  constructor(private httpClient: HttpClient) { }

  public upload(file: File): Observable<any> {
    const fileInput = new AnexoInput();
    fileInput.arquivoNome = file.name;

    return this.httpClient.post<AnexosCreatedOutput>(this.basePaht, fileInput)
      .pipe(
        switchMap((response) => {
          const formData = new FormData();
          formData.append("thumbnail", file);
          return this.httpClient.put<any>(response.uploadLink, formData);
        })
      );
  }

  private get basePaht(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}anexos`
  }
}
