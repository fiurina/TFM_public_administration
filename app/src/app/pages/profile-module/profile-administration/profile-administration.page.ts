import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth/auth.service';
import { AlertService } from './../../../shared/services/alert/alert.service';
import { ProfileService } from './../services/profile.service';
import { Component, OnInit } from '@angular/core';
import { RouterConstants } from 'src/app/shared/config/constants/router.constants';

@Component({
  selector: 'app-profile-administration',
  templateUrl: './profile-administration.page.html',
  styleUrls: ['./profile-administration.page.scss'],
})
export class ProfileAdministrationPage implements OnInit {

  loading: boolean;
  edit: boolean;
  
  name: string;
  surname: string;
  dni: string;

  balance: number;
  constructor(
    private profileService: ProfileService,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  ionViewWillEnter(){
    this.getUser();
  }

  async getUser(){
    try {
      this.loading = true;
      let user = await this.profileService.getAdminUser().toPromise();
      console.log('User: ', user);
      this.name = user.name;
      this.surname = user.surname;
      this.dni = user.dni;
      this.balance = user.balance;
      this.loading = false;
    } catch (error) {
      await this.alertService.showErrorAlert('Usuario no disponible', 'Error al cargar el usuario en la blockchain local.\n'+error.error.message);
      console.log(error);
      this.loading = false;
    }
  }

  async save(){
    if(this.edit){
      await this.saveUser();
    }
    this.getUser();
    this.edit = !this.edit;
  }

  async saveUser(){
    try {
      this.loading = true;
      await this.profileService.saveAdminUser(this.name,this.surname, this.dni).toPromise();
      this.loading = false;
    } catch (error) {
      await this.alertService.showErrorAlert('Usuario no disponible', 'Error al guardar el usuario en la blockchain local.\n'+error.error.message);
      console.log(error);
      this.loading = false;
    }
  }

  async deleteAccount(){
    try {
      this.loading = true;
      let deleteAccount = await this.profileService.deleteAdminUser().toPromise();
      console.log('Delete account', deleteAccount);
      this.loading = false;
      await this.logout();
    } catch (error) {
      await this.alertService.showErrorAlert('Usuario no disponible', 'Error al eliminar el usuario en la blockchain local.\n'+error.error.message);
      console.log(error);
      this.loading = false;
    }
  }

  private async logout() {
    return new Promise(async (resolve, reject) =>{
      await this.authService.logoutUser().toPromise();
      await this.authService.removeStorage();
      this.router.navigateByUrl(RouterConstants.LOGIN, { replaceUrl: true });
    });
  }

}
