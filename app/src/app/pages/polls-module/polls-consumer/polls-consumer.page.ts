import { AlertService } from './../../../shared/services/alert/alert.service';
import { PollAdministrationService } from './../polls-administration/services/poll-administration.service';
import { PollConsumerService } from './services/poll-consumer.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterConstants } from 'src/app/shared/config/constants/router.constants';

@Component({
  selector: 'app-polls-consumer',
  templateUrl: './polls-consumer.page.html',
  styleUrls: ['./polls-consumer.page.scss'],
})
export class PollsConsumerPage implements OnInit {

  loading: boolean;
  showData: boolean;
  polls: Array<any> = new Array<any>();
  constructor(
    private pollConsumer: PollConsumerService,
    private pollAdministration: PollAdministrationService,
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

  answerPoll(element){
    console.log('Page ', element);
    this.router.navigateByUrl(RouterConstants.POLLS_CONSUMER_DETAIL + '/' + element.id, {state: {id:element.id}});
  }

}
