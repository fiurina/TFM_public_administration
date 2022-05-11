import { AlertService } from './../../../shared/services/alert/alert.service';
import { Router } from '@angular/router';
import { PollConsumerService } from './../polls-consumer/services/poll-consumer.service';
import { PollAdministrationService } from './services/poll-administration.service';
import { Component, OnInit } from '@angular/core';
import { RouterConstants } from 'src/app/shared/config/constants/router.constants';
import { Poll } from 'src/app/shared/models/poll.model';

@Component({
  selector: 'app-polls-administration',
  templateUrl: './polls-administration.page.html',
  styleUrls: ['./polls-administration.page.scss'],
})
export class PollsAdministrationPage implements OnInit {

  loading: boolean;
  showData: boolean;
  polls: Array<Poll> = new Array<Poll>();
  constructor(
    private pollAdministration: PollAdministrationService,
    private pollConsumer: PollConsumerService,
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit() { 
    // this.getTotalPolls();
    this.getAllPolls();
  }

  ionViewWillEnter(){
    // this.getTotalPolls();
    this.getAllPolls();
  }

  async getAllPolls() {
    try {
      this.loading = true;
      this.polls = await this.pollConsumer.getAllPolls().toPromise();
      console.log('AllPolls ', this.polls);
      this.loading = false;
    } catch (error) {
      await this.alertService.showErrorAlert('Encuestas no disponibles', 'Error al cargar las encuestas en la blockchain local.\n'+error.error.message);
      console.log(error);
      this.loading = false;
    }
  }

  async getTotalPolls() {
    try {
      this.loading = true;
      let totalPolls = await this.pollAdministration.getTotalPolls().toPromise();
      console.log('TotalPolls: ', totalPolls);
      this.loading = false;
    } catch (error) {
      await this.alertService.showErrorAlert('Encuestas no disponibles', 'Error al cargar las encuestas en la blockchain local.\n'+error.error.message);
      console.log(error);
      this.loading = false;
    }
  }

  async deleteElement(element: any){
    try {
      console.log(element);
      this.loading = true;
      let deleted = await this.pollAdministration.deletePoll(element.id).toPromise();
      console.log('Deleted: ', deleted);
      this.loading = false;
      this.getAllPolls();
    } catch (error) {
      await this.alertService.showErrorAlert('Encuestas no disponibles', 'Error al cargar las encuestas en la blockchain local.\n'+error.error.message);
      console.log(error);
      this.loading = false;
    }
  }

  openPollCreation(){
    this.router.navigateByUrl(RouterConstants.POLLS_ADMINISTRATION_CREATION);
  }

  viewResults(element){
    console.log('Page ', element);
    this.router.navigateByUrl(RouterConstants.POLLS_ADMINISTRATION_RESULTS +'/'+element.id, {state: {id:element.id}});
  }

}
