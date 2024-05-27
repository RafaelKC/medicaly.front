import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable, switchMap, tap} from "rxjs";
import {ensureTrailingSlash} from "../functions/ensure-trailing-slash";
import {environment} from "../../environments/environment";
import {AnexosCreatedOutput} from "../models/anexos-created-output";
import {AnexoInput} from "../models/anexos-input";
import {PagedResult} from "../models/paged-result";
import {AnexoComLinkOutput} from "../models/anexos-com-link-output";
import {FilteredInput} from "../models/paged-filtered-input";

@Injectable({
  providedIn: 'root'
})

export class AnexosService {

  constructor(private httpClient: HttpClient) { }

  public getList(pagedInput: FilteredInput): Observable<PagedResult<AnexoComLinkOutput>> {
    let params = new HttpParams();
    params = params.set('skipCount', pagedInput.skipCount)
    params = params.set('maxResultCount', pagedInput.maxResultCount)
    if(pagedInput.filter) {
      params = params.set('filter', pagedInput.filter)
    }

    return this.httpClient.get<PagedResult<AnexoComLinkOutput>>(this.basePath, { params });
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.basePath + `/${id}`);
  }

  public upload(file: File, id:string | null = null, reportProgress = false): Observable<HttpEvent<{ key: string }> | { key: string }> {
    const fileInput = new AnexoInput();
    fileInput.arquivoNome = file.name;
    if(id!=null){
      fileInput.id = id
    }

    return this.httpClient.post<AnexosCreatedOutput>(this.basePath, fileInput)
      .pipe(
        switchMap((response) => {
          const formData = new FormData();
          formData.append("thumbnail", file);

          const progressRequest =  this.httpClient.put<{ key: string }>(response.uploadLink, formData, {
            reportProgress: true,
            observe: 'response'
          });

          const noProgressRequest =  this.httpClient.put<{ key: string }>(response.uploadLink, formData);

          return reportProgress ? progressRequest : noProgressRequest;
        })
      );
  }

  public download(anexo: AnexoComLinkOutput, autoDownload: boolean = false): Observable<Blob> {
    console.log(anexo.downloadLink);
    return this.httpClient.get(anexo.downloadLink, {
      responseType: "blob"
    }).pipe(
      tap((response) => {
        if (autoDownload) {
          const file = new Blob([response], { type: response.type });
          const url= window.URL.createObjectURL(file);
          const link = document.createElement("a");
          link.href = url;
          link.download = anexo.bucketEndereco
          link.click();
          window.URL.revokeObjectURL(url);
          link.remove();
        }
      })
    );
  }

  private get basePath(): string {
    return `${ensureTrailingSlash(environment.apiUrl)}anexos`
  }
}
