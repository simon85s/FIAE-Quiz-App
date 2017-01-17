import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Question } from '../question/question.component';
import { AnswerService } from '../services/answer.service'
import { Observable } from 'rxjs/rx'

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  providers: [QuestionService, AnswerService]
})
export class QuestionListComponent implements OnInit {

  constructor(private questionService: QuestionService, private answerService: AnswerService) { }

  ids: string[] = [];
  questions: Question[] = []

  ngOnInit() {
    /*retrieve all questions*/
    this.questionService.getQuestionList().subscribe(question => this.questions = question,
      e => {}, () => console.log(this.questions))
  }

  deleteQuestion(question: any) {
    /*retrieve all answerids to delete*/
    this.answerService.getAnswers(question._id).delay(300).subscribe(answer => this.ids.push(answer._id), 
    e => {},() => { source.subscribe(), location.reload() })
      
    /*subscribe to the observables*/
    let source = Observable.forkJoin(this.answerService.deleteAnswers(this.ids),
      this.questionService.deleteQuestion(question._id))  
  }

  get length():boolean {
    
    return this.questions.length > 10;
  }
}
