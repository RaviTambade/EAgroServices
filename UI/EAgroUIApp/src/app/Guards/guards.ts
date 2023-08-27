import { CanActivateChildFn,  CanActivateFn,  CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../Shared/authentication/auth.service';
import { inject } from '@angular/core';
import { Role } from '../Models/Enums/role';

export function canActivateFarmerRoutes(): CanMatchFn | CanActivateChildFn| CanActivateFn {
  return function () {
    const authsvc: AuthService = inject(AuthService);
    if (
      authsvc.isAuthenticated() &&
      authsvc.isTokenHaveRequiredRole(Role.farmer)
    ) {
      return true;
    }
    const router: Router = inject(Router);
    return router.navigate(['auth/login']);
  };
}

export function canActivateCollectionCenterRoutes(): CanMatchFn | CanActivateChildFn |CanActivateFn {
  return function () {
    const authsvc: AuthService = inject(AuthService);
    if (
      authsvc.isAuthenticated() &&
      authsvc.isTokenHaveRequiredRole(Role.collectionmanager)
    ) {
      return true;
    }
    const router: Router = inject(Router);
    return router.navigate(['auth/login']);
  };
}

export function canActivateTransporterRoutes(): CanMatchFn | CanActivateChildFn |CanActivateFn {
  return function () {
    const authsvc: AuthService = inject(AuthService);
    if (
      authsvc.isAuthenticated() &&
      authsvc.isTokenHaveRequiredRole(Role.transporter)
    ) {
      return true;
    }
    const router: Router = inject(Router);
    return router.navigate(['auth/login']);
  };
}

export function canActivateMerchantRoutes(): CanMatchFn | CanActivateChildFn |CanActivateFn {
  return function () {
    const authsvc: AuthService = inject(AuthService);
    if (
      authsvc.isAuthenticated() &&
      authsvc.isTokenHaveRequiredRole(Role.merchant)
    ) {
      return true;
    }
    const router: Router = inject(Router);
    return router.navigate(['auth/login']);
  };
};

  export function canActivateInspectorRoutes(): CanMatchFn | CanActivateChildFn |CanActivateFn{
    return function () {
      const authsvc: AuthService = inject(AuthService);
      if (
        authsvc.isAuthenticated() &&
        authsvc.isTokenHaveRequiredRole(Role.inspector)
      ) {
        return true;
      }
      const router: Router = inject(Router);
      return router.navigate(['auth/login']);
    };
  }
