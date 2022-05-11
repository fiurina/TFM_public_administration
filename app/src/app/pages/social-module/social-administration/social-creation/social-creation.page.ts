import { AlertService } from './../../../../shared/services/alert/alert.service';
import { SocialTypes } from './../../../../shared/models/social.model';
import { Router } from '@angular/router';
import { SocialAdministrationService } from './../services/social-administration.service';
import { Component, OnInit } from '@angular/core';
import { RouterConstants } from 'src/app/shared/config/constants/router.constants';

@Component({
  selector: 'app-social-creation',
  templateUrl: './social-creation.page.html',
  styleUrls: ['./social-creation.page.scss'],
})
export class SocialCreationPage implements OnInit {

  title: string;
  description: string;
  tokens: number;
  imageURL: string;
  image: File;
  conditionType: number;
  minRange: number;
  maxRange: number;
  param: string;

  conditionTypes: Array<any>;
  socialTypesEnum = SocialTypes;

  loading: boolean;
  edit: boolean;
  constructor(
    private socialAdministration: SocialAdministrationService,
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.conditionTypes = [
      {key: 'Gender', value: SocialTypes.GENDER},
      {key: 'Salary', value: SocialTypes.SALARY},
      {key: 'Age', value: SocialTypes.AGE},
    ];
  }

  handleImage(files: FileList){
    this.image = files.item(0);
  }

  async createSocial() {
    try {
      this.loading = true;
      console.log('Image', this.image, typeof this.image);
      this.imageURL = (await this.socialAdministration.uploadImageIPFS(this.image).toPromise()).imageURL.path;
      console.log('Image uploaded', this.imageURL);
      let social = await this.socialAdministration.createSocialAid(this.title, this.description, this.tokens, this.imageURL, this.conditionType, this.minRange, this.maxRange, this.param).toPromise();
      console.log('Create social: ', social);
      this.loading = false;
      this.router.navigateByUrl(RouterConstants.SOCIAL_ADMINISTRATION, {replaceUrl: true});
    } catch (error) {
      await this.alertService.showErrorAlert('Creación incorrecta de la Ayuda', 'Error al cargar las ayudas en la blockchain local.\n'+error.error.message);
      console.log(error);
      this.loading = false;
    }
  }

  conditionChanged(){
    this.minRange = 0;
    this.maxRange = 0;
    this.param = '';
  }

  checkDisabled(){
    let disabled = true;
    if(!this.loading && this.title && this.description && this.tokens && [0,1,2].includes(this.conditionType)){
      console.log(this.conditionType == SocialTypes.GENDER && this.minRange >=0 && this.maxRange >=0)
      console.log(this.conditionType == SocialTypes.SALARY && this.minRange >=0 && this.maxRange >=0)
      console.log(this.conditionType == SocialTypes.AGE && this.param)

      if(this.conditionType === SocialTypes.GENDER && this.param){ disabled = false; }
      if(this.conditionType === SocialTypes.SALARY && this.param){ disabled = false; }
      if(this.conditionType === SocialTypes.AGE && this.minRange >0 && this.maxRange >0){ disabled = false; }
    }
    console.log(disabled, !this.loading, this.title, this.description, this.tokens, this.conditionType, this.minRange, this.maxRange, this.param)
    return disabled;
  }

}
