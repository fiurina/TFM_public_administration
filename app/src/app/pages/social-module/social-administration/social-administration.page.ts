import { AlertService } from './../../../shared/services/alert/alert.service';
import { Router } from '@angular/router';
import { SocialConsumerService } from './../social-consumer/services/social-consumer.service';
import { SocialAdministrationService } from './services/social-administration.service';
import { Component, OnInit } from '@angular/core';
import { RouterConstants } from 'src/app/shared/config/constants/router.constants';
import { Social } from 'src/app/shared/models/social.model';

@Component({
  selector: 'app-social-administration',
  templateUrl: './social-administration.page.html',
  styleUrls: ['./social-administration.page.scss'],
})
export class SocialAdministrationPage implements OnInit {

  loading: boolean;
  showData: boolean;
  socials: Array<Social> = new Array<Social>();
  contractBalance: number = 25.4534;
  addTokens: number;
  constructor(
    private socialAdministration: SocialAdministrationService,
    private socialConsumer: SocialConsumerService,
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit() { 
    // this.getTotalSocialAids();
    this.getAllSocialAids();
    this.getContractBalance();
  }

  ionViewWillEnter(){
    // this.getTotalSocialAids();
    this.getAllSocialAids();
    this.getContractBalance();
  }

  async getAllSocialAids() {
    try {
      this.loading = true;
      this.socials = await this.socialConsumer.getAllSocial().toPromise();
      console.log('AllSocial ', this.socials);
      this.loading = false;
    } catch (error) {
      await this.alertService.showErrorAlert('Ayudas no disponibles', 'Error al cargar las ayudas en la blockchain local.\n'+error.error.message);
      console.log(error);
      this.loading = false;
    }
  }

  async getTotalSocialAids() {
    try {
      this.loading = true;
      let totalSocial = await this.socialAdministration.getTotalSocials().toPromise();
      console.log('TotalSocial: ', totalSocial);
      this.loading = false;
    } catch (error) {
      await this.alertService.showErrorAlert('Ayudas no disponibles', 'Error al cargar las ayudas en la blockchain local.\n'+error.error.message);
      console.log(error);
      this.loading = false;
    }
  }

  async deleteElement(element: any){
    try {
      this.loading = true;
      let deleted = await this.socialAdministration.deleteSocial(element.id).toPromise();
      console.log('Deleted: ', deleted);
      this.loading = false;
      this.getAllSocialAids();
    } catch (error) {
      await this.alertService.showErrorAlert('Encuestas no disponibles', 'Error al cargar las encuestas en la blockchain local.\n'+error.error.message);
      console.log(error);
      this.loading = false;
    }
  }

  viewDetail(element){
    this.router.navigateByUrl(RouterConstants.SOCIAL_ADMINISTRATION_DETAIL + '/' + element.id, {state: {id:element.id}});
  }

  async sendTokens(){
    try {
      this.loading = true;
      this.contractBalance = await this.socialAdministration.sendTokens(this.addTokens).toPromise();
      this.loading = false;
      this.getContractBalance();
    } catch (error) {
      await this.alertService.showErrorAlert('Balance no disponible', 'Error al cargar el balance del contrato.\n'+error.error.message);
      console.log(error);
      this.loading = false;
    }
  }

  async getContractBalance(){
    try {
      this.loading = true;
      this.contractBalance = await this.socialAdministration.getContractBalance().toPromise();
      console.log('Balance', this.contractBalance, typeof this.contractBalance)
      this.loading = false;
    } catch (error) {
      await this.alertService.showErrorAlert('Balance no disponible', 'Error al cargar el balance del contrato.\n'+error.error.message);
      console.log(error);
      this.loading = false;
    }
  }

  openSocialCreation(){
    this.router.navigateByUrl(RouterConstants.SOCIAL_ADMINISTRATION_CREATION);
  }

}
