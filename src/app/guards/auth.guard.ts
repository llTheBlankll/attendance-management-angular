import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../authentication/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn: boolean = authService.isAuthenticated().valueOf();

  // Check if the user is already authenticated
  if (isLoggedIn) {
    return true;
  }

  router.navigate(["/login"]).then(_ => console.log("Navigated to login page"));
  return false;
};
