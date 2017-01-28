import {Component, OnInit, Input , } from '@angular/core';
import {AnswerComponent} from '../pages'
import {Question} from '../question/question.component';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {

  constructor() { } 
 
  ngOnInit() {}

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> refs/remotes/origin/master
    this.count =  this.answerComponent.correctCount
    console.log("count",this.count)
  }
  
>>>>>>> 18f3f1f834f936e000dc8a17e36d05d1dc9910d8
}
  

