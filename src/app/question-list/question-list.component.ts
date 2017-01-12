import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../services/question.service';
import {Question} from '../question/question.component';
import {AnswerService} from '../services/answer.service'
import {Observable} from 'rxjs/Observable'

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  providers: [QuestionService,AnswerService]
})
export class QuestionListComponent implements OnInit {

  constructor(private questionService:QuestionService,private answerService:AnswerService) { }

  questions:Question[]=[]
  ngOnInit() {

    this.questionService.getQuestionList().subscribe(q => this.questions = q, 
    error => console.log(error), () => console.log(this.questions))
  }

  test(question:any){
    let ids = this.answerService.getAnswers(question.id).subscribe();
    console.log("ids",ids);
    this.answerService.deleteAnswers(["58780c57e74900191c8225fa","58780c57e74900191c8225f9","58780c57e74900191c8225f8"]).subscribe(data => console.log(data));
    this.questionService.deleteQuestion(question._id).subscribe(data => this.questions.splice(data),
    error => console.log(error), () => (data => console.log(data)))
   
  }
}
