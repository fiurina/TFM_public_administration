import { environment } from './../../../../../environments/environment';
import { AlertService } from './../../../../shared/services/alert/alert.service';
import { Social, SocialTypes } from './../../../../shared/models/social.model';
import { SocialConsumerService } from './../services/social-consumer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-social-check',
  templateUrl: './social-check.page.html',
  styleUrls: ['./social-check.page.scss'],
})
export class SocialCheckPage implements OnInit {

  social: Social;
  loading: boolean;

  socialTypesEnum = SocialTypes;
  recieve: boolean;
  environment = environment;
  constructor(
    private socialConsumer: SocialConsumerService,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    console.log('Detail')
    this.initElement();
  }

  async initElement(){
    try{
      let id = parseInt(this.route.snapshot.paramMap.get('id'));
      console.log('Init element', id)
      if(id) {
        let social: any = await this.getSocialById(id);
        if(social){ this.social = social; }
      } 
    }catch(error){
      console.log(error);
    }
  }

  async getSocialById(id: number) {
    return new Promise(async (resolve, reject) =>{
      try{
        this.loading = true;
        let social = await this.socialConsumer.getSocialById(id).toPromise();
        console.log('Social: ', social);
        this.loading = false;
        resolve(social);
      } catch (error) {
        await this.alertService.showErrorAlert('Ayudas no disponibles', 'Error al cargar las ayudas en la blockchain local.\n'+error.error.message);
        this.loading = false;
        reject(error);
      }
    });
  }

  disabledButton(){
    return this.loading;
  }

  async checkSocial() {
    try {
      this.loading = true;
      let validated = await this.socialConsumer.checkSocial(this.social.id).toPromise();
      if(validated) this.recieve = true;
      console.log('checkSocial ', validated);
      this.loading = false;
    } catch (error) {
      await this.alertService.showErrorAlert('Ayudas no disponibles', 'Error al cargar las ayudas en la blockchain local.\n'+error.error.message);
      console.log(error);
      this.loading = false;
    }
  }

  async recieveSocial() {
    try {
      this.loading = true;
      let answer = await this.socialConsumer.recieveSocial(this.social.id).toPromise();
      console.log('recieveSocial ', answer);
      this.loading = false;
    } catch (error) {
      await this.alertService.showErrorAlert('Ayudas no disponibles', 'Error al cargar las ayudas en la blockchain local.\n'+error.error.message);
      console.log(error);
      this.loading = false;
    }
  }
}
