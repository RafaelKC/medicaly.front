import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {catchError, Observable, throwError} from 'rxjs';
import {AuthenticationService, stringIsNullOrEmptyOrWhitespace} from "../../tokens";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authSerivce: AuthenticationService) {
  }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authSerivce.token;
        if (!stringIsNullOrEmptyOrWhitespace(token)) {
          req = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
          });
        }

      return next.handle(req)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status == HttpStatusCode.Unauthorized) {
              this.authSerivce.sair();
            }
            return throwError(() => error);
          })
        );
    }
}
