import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import {MessageService} from "primeng/api";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (
            error.status !== HttpStatusCode.UnprocessableEntity
            && error.status !== HttpStatusCode.Unauthorized
          ) {
            this.messageService.add({summary: 'Erro com o service', severity: 'error', detail: error.message})
          }
          return throwError(() => error);
        })
      );
  }
}
