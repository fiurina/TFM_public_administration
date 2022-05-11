import { environment } from './../../../../environments/environment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-polls-list',
  templateUrl: './polls-list.component.html',
  styleUrls: ['./polls-list.component.scss'],
})
export class PollsListComponent implements OnInit {

  @Input() elements: Array<any>;
  @Input() loading: boolean;
  @Input() drag: boolean;
  @Output() selectEmitter: EventEmitter<any> = new EventEmitter();
  @Output() deleteEmitter: EventEmitter<any> = new EventEmitter();

  environment = environment;
  constructor() { }

  ngOnInit() {}

  array(n: number): any[]{
    return Array(n);
  }

  dateToString(n: number){
    let date = new Date(n);
    return date.getDate() + '/'+ (date.getMonth() +1) +'/' + date.getFullYear();
  }

  selectItem(element: any){
    this.selectEmitter.emit(element);
  }

  deleteElement(element: any){
    this.deleteEmitter.emit(element);
  }

}
