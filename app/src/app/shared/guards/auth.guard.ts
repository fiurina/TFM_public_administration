import { AlertService } from './../services/alert/alert.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { RouterConstants } from '../config/constants/router.constants';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router:Router,
    private alertService: AlertService,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, estado: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      await this.authService.getUserData();
      let authorized = this.authorizeRoleRoute(this.authService.userSession.role, next.data.Roles);
      if (authorized && this.authService.userSession && this.authService.userSession.tokenJWT) { return resolve(true); }
      this.router.navigateByUrl(RouterConstants.LOGIN, { replaceUrl: true });
      await this.alertService.showErrorAlert('Error de autenticación', 'La sesión ha finalizado o es incorrecta');
      return reject(false)
    });
  }

  authorizeRoleRoute(currentRole, authorizedRoles){
    let authorized = false;
    if(authorizedRoles.length > 0 && authorizedRoles.includes(currentRole)){
      authorized = true;
    }
    return authorized;
  }

}