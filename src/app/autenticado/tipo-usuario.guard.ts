import { CanActivateFn } from '@angular/router';
import {AuthenticationService, UserTipo} from "../../tokens";
import {inject} from "@angular/core";


export const tipoUsuarioGuard = (tipos: UserTipo[]): CanActivateFn => {
  const authenticationService = inject(AuthenticationService);

  return (route, state): boolean => {
    if (authenticationService.autenticado && authenticationService.user) {
      if (tipos.includes(authenticationService.user?.tipo)) {
        return true;
      }
    }
    return false;
  }
}
