import {Component, OnInit, Input } from '@angular/core';
import {Answer} from '../answer/answer.component';
import {Question} from '../question/question.component';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {

  constructor() { }
  @Input() selectedAnswers:Answer[];
  @Input() selectedQuestions:Question[]; 
  ngOnInit() {
  }

}
