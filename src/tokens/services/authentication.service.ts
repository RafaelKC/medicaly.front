import {afterNextRender, Inject, Injectable} from '@angular/core';
import {stringIsNullOrEmptyOrWhitespace} from "../functions";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ensureTrailingSlash} from "../functions/ensure-trailing-slash";
import {environment} from "../../environments/environment";
import {User} from "../models";
import {BehaviorSubject, catchError, first, map, Observable, of, Subject, tap} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public autenticadoChange = new BehaviorSubject<{ inicial: boolean }>({ inicial: true });
  public userChange = new BehaviorSubject<{ inicial: boolean }>({ inicial: true });

  private _autenticado = false;
  public token?: string;
  private _user?: User;

  private storage: Storage;

  private readonly AUTH_STORAGE_KEY = 'auth-token';

  constructor(
    private httpClient: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private router: ActivatedRoute,
    private messageService: MessageService,
    private route: Router) {
    this.autenticado = true;
    afterNextRender(() => {
      this.setLocalStorage();
    });
  }

  public get autenticado(): boolean {
    return this._autenticado;
  }

  public set autenticado(auth: boolean) {
    this._autenticado = auth;
    this.autenticadoChange.next({ inicial: false })
  }


  public get user(): User | undefined {
    return this._user;
  }

  public set user(auth: User | undefined) {
    this._user = auth;
    this.userChange.next({ inicial: false })
  }

  private setLocalStorage(): void {
    if (this.document.defaultView) {
      this.storage = this.document.defaultView.localStorage;
      this.setAuthInicial();
    }
  }

  public setToken(token: string): Observable<boolean> {
    this.token = token;
    this.storage.setItem(this.AUTH_STORAGE_KEY, token);
    return this.setUsuario().
      pipe(
        first(),
        catchError(() => {
          this.token = undefined;
          this.autenticado = false;
          this.user = undefined;
          this.storage.removeItem(this.AUTH_STORAGE_KEY);
          return of(false)
        }),
        map(v => {
          if (!v) return false;
          this.messageService.add({ severity: 'success', summary: 'Autenticado com sucesso' })
          return true;
        })
    )
  }


  public sair(): void {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`)
    this.httpClient.post<null>(`${ensureTrailingSlash(environment.apiUrl)}auth/logout`, null, {headers})
      .pipe(
        first(),
      ).subscribe();
    this.autenticado = false;
    this.user = undefined;
    this.token = undefined;
    this.storage.removeItem(this.AUTH_STORAGE_KEY);
    this.route.navigate(['/home']); //visto
  }

  private setAuthInicial(): void {
    this.token = this.storage.getItem(this.AUTH_STORAGE_KEY) as string;
    if (!stringIsNullOrEmptyOrWhitespace(this.token)) {
      this.setUsuario().subscribe({
        error:() => {
          this.token = undefined;
          this.autenticado = false;
          this.user = undefined;
          this.storage.removeItem(this.AUTH_STORAGE_KEY);
        }
      });
    } else {
      this.autenticado = false;
      this.user = undefined;
    }
  }

  private setUsuario(): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`)

    return this.httpClient.get<User>(`${ensureTrailingSlash(environment.apiUrl)}auth/current-user`, {headers})
      .pipe(
        first(),
        tap(value => {
          this.user = value;
          this.autenticado = true;
        }));
  }
}
