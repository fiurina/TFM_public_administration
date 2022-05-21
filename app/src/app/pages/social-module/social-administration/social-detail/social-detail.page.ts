import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Social, SocialTypes } from 'src/app/shared/models/social.model';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { SocialConsumerService } from '../../social-consumer/services/social-consumer.service';

@Component({
  selector: 'app-social-detail',
  templateUrl: './social-detail.page.html',
  styleUrls: ['./social-detail.page.scss'],
})
export class SocialDetailPage implements OnInit {

  social: Social;
  loading: boolean;

  socialTypesEnum = SocialTypes;
  environment = environment;
  constructor(
    private socialConsumer: SocialConsumerService,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
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
        await this.alertService.showErrorAlert('Ayudas no disponibles', 'Error al cargar las ayudas en la blockchain local.\n'+error?.error?.message);
        this.loading = false;
        reject(error);
      }
    });
  }
  
}
