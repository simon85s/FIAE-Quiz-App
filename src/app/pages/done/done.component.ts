import {Component, OnInit, Input , SimpleChanges} from '@angular/core';
import {AnswerComponent} from '../pages'
import {Question} from '../question/question.component';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {

  constructor() { } 
  answerComponent:AnswerComponent;
  isDone:boolean = false;
  count:number = 0;
  ngOnInit() {

    this.count =   this.answerComponent.correctCount
  }
  
}
