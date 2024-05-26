import {CanActivateFn, GuardResult, MaybeAsync} from '@angular/router';
import {AuthenticationService, UserTipo} from "../../tokens";
import {inject} from "@angular/core";
import {firstValueFrom, lastValueFrom, map, skipWhile} from "rxjs";


export const tipoUsuarioGuard = (tipos: UserTipo[]): CanActivateFn => {
  return (route, state): MaybeAsync<GuardResult> => {
  const authenticationService = inject(AuthenticationService);
  const sub = authenticationService.userChange.pipe(
    map(user => {
      if (user === undefined) return true
      if (!user) return false;
      return tipos.includes(user.tipo);
    }));

  return firstValueFrom(sub);
  }
}
