import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../../tokens";



export const notAuthGuard: CanActivateFn = (route, state) => {
  const authorizationService = inject(AuthenticationService);
  const authenticado = authorizationService.autenticado;
  const router = inject(Router);
  if (authenticado) {
    router.navigate(['/'])
    return false;
  } else {
    return true
  }
};
