import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../pages/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route,
  state,
  router: Router = inject(Router),
  authService: AuthService = inject(AuthService)
) => {
  if (authService.checkAuthentication()) {
    const { roles } = route.data;
    const user = authService.getSessionUser();

    if (roles && !roles.includes(user.role)) {
      // role not authorized so redirect to Auth
      router.navigate(['/']);
      return false;
    }

    return true;
  }
  else {
    return false;
  }
};
