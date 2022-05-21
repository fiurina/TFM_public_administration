import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth/auth.service';
import { AlertService } from './../../../shared/services/alert/alert.service';
import { ProfileService } from './../services/profile.service';
import { Component, OnInit } from '@angular/core';
import { ClientUser } from 'src/app/shared/models/user.model';
import { RouterConstants } from 'src/app/shared/config/constants/router.constants';

@Component({
  selector: 'app-profile-consumer',
  templateUrl: './profile-consumer.page.html',
  styleUrls: ['./profile-consumer.page.scss'],
})
export class ProfileConsumerPage implements OnInit {

  loading: boolean;
  edit: boolean;
  
  name: string;
  surname: string;
  dni: string;
  gender: string;
  salary: string;
  age: number;

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
      let user: ClientUser = await this.profileService.getCitizenUser().toPromise();
      console.log('User: ', user);
      this.name = user.name;
      this.surname = user.surname;
      this.dni = user.dni;
      this.gender = user.socialParams.gender;
      this.salary = user.socialParams.salary;
      this.age = user.socialParams.age;
      this.balance = user.balance;
      this.loading = false;
    } catch (error) {
      await this.alertService.showErrorAlert('Usuario no disponible', 'Error al cargar el usuario en la blockchain local.\n'+error?.error?.message);
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
      let socialParams = {gender:this.gender, salary: this.salary, age: this.age};
      await this.profileService.saveCitizenUser(this.name,this.surname, this.dni, socialParams).toPromise();
      this.loading = false;
    } catch (error) {
      await this.alertService.showErrorAlert('Usuario no disponible', 'Error al guardar el usuario en la blockchain local.\n'+error?.error?.message);
      console.log(error);
      this.loading = false;
    }
  }

  async deleteAccount(){
    try {
      this.loading = true;
      let deleteAccount = await this.profileService.deleteCitizenUser().toPromise();
      console.log('Delete account', deleteAccount);
      this.loading = false;
      await this.logout();
    } catch (error) {
      await this.alertService.showErrorAlert('Usuario no disponible', 'Error al eliminar el usuario en la blockchain local.\n'+error?.error?.message);
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
