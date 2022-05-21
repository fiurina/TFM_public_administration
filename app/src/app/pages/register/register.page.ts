import { AlertService } from './../../shared/services/alert/alert.service';
import { LoginService } from './../login/services/login.service';
import { AuthService } from './../../shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { RegisterService } from './services/register.service';
import { Router } from '@angular/router';
import { RouterConstants } from 'src/app/shared/config/constants/router.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string;
  surname: string;
  dni: string;
  gender: string;
  salary: string;
  age: number;

  loading: boolean;
  localWallets: Array<any>;
  wallet: any;

  type: string = 'citizen';

  constructor(
    private registerService: RegisterService,
    private authService: AuthService,
    private router: Router,
    private loginService: LoginService,
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
      if(history.state.selectedAccount) { this.wallet = this.localWallets.find(x=> x.account === history.state.selectedAccount.account); }
      this.loading = false;
    } catch (error) {
      await this.alertService.showErrorAlert('Wallets no disponibles', 'Error al cargar las wallets en la blockchain local.\n'+error?.error?.message);
      console.log("Error", error);
      this.loading = false;
    }
  }

  changeType(type: string){
    this.type = type;
  }

  async register() {
    try {
      this.loading = true;
      let resp;
      switch(this.type){
        case 'citizen':
          resp = await this.registerService.registerUser(this.name, this.surname, this.dni, this.gender, this.salary, this.age, this.wallet.account).toPromise();
          break;
        case 'admin':
          resp = await this.registerService.registerAdminUser(this.name, this.surname, this.dni, this.wallet.account).toPromise();
          break;
      }
      console.log("Register", resp);
      await this.login();
      this.router.navigateByUrl(RouterConstants.TABS, { replaceUrl: true });
      this.loading = false;
    } catch (error) {
      await this.alertService.showErrorAlert('Registro incorrecto', 'Error en el proceso de registro del usuario.\n'+error?.error?.message);
      console.log("Error", error);
      this.loading = false;
    }
  }

  async login(){
    return new Promise(async (resolve, reject) =>{
      try {
        this.loading = true;
        const resp = await this.loginService.authenticateUser(this.wallet.account).toPromise();
        this.authService.userSession.tokenJWT = resp.token;
        this.authService.userSession.wallet = this.wallet.account;
        this.authService.userSession.role = resp.user.role;
        console.log("Login ", resp, this.authService.userSession);
        await this.authService.storeUserData();
        this.loading = false;
        resolve(true);
      } catch (error) {
        await this.alertService.showErrorAlert('Login incorrecto', 'Error en el proceso de login del usuario.\n'+error?.error?.message);
        await this.authService.removeSession();
        console.log("Error Login", error);
        this.loading = false;
        reject();
      }
    });
  }

  loadLogin(){
    this.router.navigateByUrl(RouterConstants.LOGIN, { replaceUrl: true });
  }

}
