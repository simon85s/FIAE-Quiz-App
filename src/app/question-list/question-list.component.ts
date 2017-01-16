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
  ids:any[] =[];
  questions:Question[]=[]
  ngOnInit() {

    this.questionService.getQuestionList().subscribe(q => this.questions = q, 
    error => console.log(error), () => console.log(this.questions))
  }

  deleteQuestion(question:any){

    this.answerService.getAnswers(question._id).delay(300).subscribe(a => this.ids.push(a._id))
    console.log("IDS", this.ids)
    this.answerService.deleteAnswers(this.ids).subscribe(data => console.log("DATA",data),
    error => console.log(error), () => this.questionService.deleteQuestion(question._id).subscribe(data => this.questions.splice(data),
    error => console.log(error), () => this.ngOnInit()));   
  }
}
