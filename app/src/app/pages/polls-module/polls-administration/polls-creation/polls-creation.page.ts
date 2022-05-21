import { AlertService } from './../../../../shared/services/alert/alert.service';
import { Router } from '@angular/router';
import { PollAdministrationService } from './../services/poll-administration.service';
import { Component, OnInit } from '@angular/core';
import { RouterConstants } from 'src/app/shared/config/constants/router.constants';

@Component({
  selector: 'app-polls-creation',
  templateUrl: './polls-creation.page.html',
  styleUrls: ['./polls-creation.page.scss'],
})
export class PollsCreationPage implements OnInit {

  title: string;
  description: string;
  imageURL: string;
  image: File;
  question: string;
  answers: Object = {};
  numAnswersArray: Array<string>;
  numAnswers: number = 0;

  loading: boolean;
  edit: boolean;
  constructor(
    private pollAdministration: PollAdministrationService,
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.changeAnswers();
  }

  changeAnswers(){
    console.log(this.answers)
    for(let i = 0; i<this.numAnswers; i++){
      this.answers['answer'+i] = '';
    }
    this.numAnswersArray = new Array<string>(this.numAnswers);
    // this.answers = new Array<string>(this.numAnswers);
  }

  mapAnswers(){
    this.numAnswersArray = new Array<string>();
    for(let i = 0; i<this.numAnswers; i++){
      this.numAnswersArray.push(this.answers['answer'+i]); 
    }
  }

  handleImage(files: FileList){
    this.image = files.item(0);
  }

  async createPoll() {
    try {
      this.loading = true;
      console.log(this.answers);
      this.mapAnswers();
      console.log('Image', this.image, typeof this.image);
      if(this.image){
        this.imageURL = (await this.pollAdministration.uploadImageIPFS(this.image).toPromise()).imageURL.path;
      }
      console.log('Image uploaded', this.imageURL);
      let poll = await this.pollAdministration.createPoll(this.title, this.description, this.imageURL, this.question, this.numAnswersArray).toPromise();
      console.log('Create poll: ', poll);
      this.loading = false;
      this.router.navigateByUrl(RouterConstants.POLLS_ADMINISTRATION, {replaceUrl: true});
    } catch (error) {
      await this.alertService.showErrorAlert('Creación incorrecta de la Encuesta', 'Error al cargar las encuestas en la blockchain local.\n'+error?.error?.message);
      console.log(error);
      this.loading = false;
    }
  }

}
