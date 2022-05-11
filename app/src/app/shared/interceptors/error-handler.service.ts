import { AuthService } from './../services/auth/auth.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterConstants } from '../config/constants/router.constants';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  async showMessage(error: HttpErrorResponse): Promise<string> {
    return new Promise(async (resolve, reject) => {
      let text = 'Error en la petición';
      switch (error.status) {
        case 0:
          text = 'No se ha podido conectar con el servidor';
          break;
        case 310:
          text = 'Redirección en proceso...';
          window.location.href = error.error.url;
          break;
        case 401:
          text = 'Error de autenticación';
          this.authService.userSession.tokenJWT = undefined;
          console.log('Route of 401', this.router.url, RouterConstants.LOGIN, this.router.url !== RouterConstants.LOGIN)
          if (this.router.url !== RouterConstants.LOGIN && this.router.url !== '/') {
            this.router.navigateByUrl(RouterConstants.LOGIN, { replaceUrl: true });
          } else { await this.authService.removeSession(); }
          break;
        case 403:
          text = 'Usuario bloqueado. Contacte con administrador';
          break;
        case 426:
          text = 'Nueva versión disponible! Por favor actualice la aplicación.'
          break;
        case 500:
          text = "Error en la operación del servidor";
          break;
        case 525:
          text = error.error.message;
          break;
        default:
          text = 'Error en la petición';
      }
      resolve(text);
    });
  }

}
