import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService, UserTipo} from "../../tokens";
import {firstValueFrom, map, skipWhile} from "rxjs";



export const authGuard: CanActivateFn = (route, state) => {
  const authorizationService = inject(AuthenticationService);
  const router = inject(Router);

  const sub = authorizationService.autenticadoChange.pipe(
    map(autenticado => {
      if (autenticado === undefined) return true
      if (autenticado) {
        return true
      } else {
        router.navigate(['/notAuth/login'], { queryParams: {tipoUsuario: UserTipo.Paciente} })
        return false;
      }
    })
  );

  return firstValueFrom(sub)
};
