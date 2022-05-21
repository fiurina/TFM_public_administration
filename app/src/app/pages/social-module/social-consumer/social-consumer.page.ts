import { AlertService } from './../../../shared/services/alert/alert.service';
import { SocialConsumerService } from './services/social-consumer.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterConstants } from 'src/app/shared/config/constants/router.constants';
import { Social } from 'src/app/shared/models/social.model';

@Component({
  selector: 'app-social-consumer',
  templateUrl: './social-consumer.page.html',
  styleUrls: ['./social-consumer.page.scss'],
})
export class SocialConsumerPage implements OnInit {

  loading: boolean;
  showData: boolean;
  socials: Array<Social> = new Array<Social>();
  constructor(
    private socialConsumer: SocialConsumerService,
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit() { 
    this.getAllSocialAids();
  }

  ionViewWillEnter(){
    this.getAllSocialAids();
  }

  async getAllSocialAids() {
    try {
      this.loading = true;
      this.socials = await this.socialConsumer.getAllSocial().toPromise();
      console.log('AllSocial ', this.socials);
      this.loading = false;
    } catch (error) {
      await this.alertService.showErrorAlert('Ayudas no disponibles', 'Error al cargar las ayudas en la blockchain local.\n'+error?.error?.message);
      console.log(error);
      this.loading = false;
    }
  }

  viewResults(element){
    console.log('Page ', element);
    this.router.navigateByUrl(RouterConstants.SOCIAL_CONSUMER_CHECK +'/'+element.id, {state: {id:element.id}});
  }

}
