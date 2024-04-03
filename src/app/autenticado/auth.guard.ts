import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService, UserTipo} from "../../tokens";



export const authGuard: CanActivateFn = (route, state) => {
  const authorizationService = inject(AuthenticationService);
  const authenticado = authorizationService.autenticado;
  const router = inject(Router);
  if (authenticado) {
    return true
  } else {
    router.navigate(['/notAuth/login'], { queryParams: {tipoUsuario: UserTipo.Paciente} })
    return false;
  }
};
