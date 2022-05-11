import { environment } from './../../../../../environments/environment';
import { AlertService } from './../../../../shared/services/alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollAdministrationService } from '../../polls-administration/services/poll-administration.service';
import { PollConsumerService } from '../services/poll-consumer.service';

@Component({
  selector: 'app-polls-detail',
  templateUrl: './polls-detail.page.html',
  styleUrls: ['./polls-detail.page.scss'],
})
export class PollsDetailPage implements OnInit {

  poll: any;
  loading: boolean;
  optionSelected: number;
  environment = environment;
  constructor(
    private pollAdministration: PollAdministrationService,
    private pollConsumer: PollConsumerService,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    console.log('Detail')
    this.initElement();
  }

  async initElement(){
    try{
      // let id = history.state.id;
      let id = parseInt(this.route.snapshot.paramMap.get('id'));
      console.log('Init element', id)
      if(id) {
        let poll: any = await this.getPollById(id);
        if(poll){ this.poll = poll; }
      } 
    }catch(error){
      console.log(error);
    }
  }

  async getPollById(id: number) {
    return new Promise(async (resolve, reject) =>{
      try{
        this.loading = true;
        let poll = await this.pollAdministration.getPollById(id).toPromise();
        console.log('Poll: ', poll);
        this.loading = false;
        resolve(poll);
      } catch (error) {
        await this.alertService.showErrorAlert('Encuestas no disponibles', 'Error al cargar las encuestas en la blockchain local.\n'+error.error.message);
        this.loading = false;
        reject(error);
      }
    });
  }

  setAnswer(index){
    this.optionSelected = index;
    console.log('Option selected', this.optionSelected);
  }

  disabledButton(){
    return this.loading || isNaN(this.optionSelected);
  }

  async answerPoll() {
    try {
      this.loading = true;
      let answer = await this.pollConsumer.answerPoll(this.poll.id, this.optionSelected).toPromise();
      console.log('AnswerPoll ', answer);
      this.loading = false;
    } catch (error) {
      await this.alertService.showErrorAlert('Encuestas no disponibles', 'Error al responder la encuestas en la blockchain local.\n'+error.error.message);
      console.log(error);
      this.loading = false;
    }
  }

}
