import { CanActivateFn } from '@angular/router';
import { AuthService } from '../pages/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state, authService: AuthService = inject(AuthService)) => {
  if (authService.checkAuthentication()) {
    return true;
  } else {
    return false;
  }
};
