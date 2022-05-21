import { environment } from './../../../../../environments/environment';
import { Poll } from './../../../../shared/models/poll.model';
import { AlertService } from './../../../../shared/services/alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollAdministrationService } from '../services/poll-administration.service';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-polls-results',
  templateUrl: './polls-results.page.html',
  styleUrls: ['./polls-results.page.scss'],
})
export class PollsResultsPage implements OnInit {

  loading: boolean;
  showData: boolean;
  results: any;
  poll: Poll;

  doughnutChartLabels: string[];
  doughnutChartData: ChartData<'doughnut'>;
  doughnutChartType: ChartType = 'doughnut';
  environment = environment;
  constructor(
    private pollAdministration: PollAdministrationService,
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    console.log('Results')
    this.initElement();
  }

  async initElement(){
    try{
      let id = history.state.id;
      if(id) { 
        await this.getPollResults(id); 
        this.initGraph();
        // this.poll = await this.getPollById(id);
      } 
    }catch(error){
      console.log(error);
    }
  }

  async getPollResults(id: number) {
    return new Promise(async (resolve, reject) =>{
      try {
        this.loading = true;
        this.results = (await this.pollAdministration.getPollResults(id).toPromise()).parsedPoll;
        this.results.creationDate = new Date(this.results.creationDate).toDateString();
        console.log('Poll results: ', this.results);
        this.loading = false;
        resolve(true);
      } catch (error) {
        await this.alertService.showErrorAlert('Encuestas no disponibles', 'Error al cargar las encuestas en la blockchain local.\n'+error?.error?.message);
        this.loading = false;
        console.log(error);
        reject(error);
      }
    });
  }

  initGraph(){
    this.doughnutChartLabels = this.results.answerOptions;
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [ { data: this.results.results }, ]
    };
  }
  
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
