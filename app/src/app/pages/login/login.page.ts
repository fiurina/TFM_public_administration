import { AlertService } from './../../shared/services/alert/alert.service';
import { AuthService } from './../../shared/services/auth/auth.service';
import { ErrorHandlerService } from './../../shared/interceptors/error-handler.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { RouterConstants } from 'src/app/shared/config/constants/router.constants';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;
  eyeIcon: string = 'eye';
  passwordTypeInput = 'password';
  loading: boolean = false;
  localWallets: Array<any>;
  wallet: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getLocalWallets();
  }

  async getLocalWallets() {
    try {
      this.loading = true;
      this.localWallets = await this.loginService.getLocalWallets().toPromise();
      console.log("Local wallets ", this.localWallets);
      this.loading = false;
    } catch (error) {
      await this.alertService.showErrorAlert('Wallets no disponibles', 'Error al cargar las wallets en la blockchain local.\n'+error?.error?.message);
      console.log("Error", error);
      this.loading = false;
    }
  }

  async login() {
    try {
      this.loading = true;
      const resp = await this.loginService.authenticateUser(this.wallet.account).toPromise();
      this.authService.userSession.tokenJWT = resp.token;
      this.authService.userSession.wallet = this.wallet.account;
      this.authService.userSession.role = resp.user.role;
      console.log("Login ", resp, this.authService.userSession);
      await this.authService.storeUserData();
      this.loading = false;
      this.router.navigateByUrl(RouterConstants.TABS, { replaceUrl: true });
    } catch (error) {
      await this.alertService.showErrorAlert('Login incorrecto', 'Error en el proceso de login del usuario.\n'+error?.error?.message);
      await this.authService.removeSession();
      console.log("Error Login", error);
      this.loading = false;
      this.router.navigate([RouterConstants.REGISTER], { state: {selectedAccount: this.wallet}, replaceUrl: true });
    }
  }

  loadRegister(){
    this.router.navigateByUrl(RouterConstants.REGISTER, { replaceUrl: true });
  }

  togglePasswordMode() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    this.eyeIcon = this.passwordTypeInput === 'text' ? 'eye-off' : 'eye';
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    const inputSelection = nativeEl.selectionStart;
    nativeEl.focus();
    setTimeout(() => { nativeEl.setSelectionRange(inputSelection, inputSelection); }, 1);
  }
}
