import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../shared/shared'
import { Question } from '../question/question.component';
import { AnswerService } from '../../shared/shared';
import {FilterPipe} from '../..shared/shared'
import { Observable } from 'rxjs/rx';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  providers: [QuestionService, AnswerService]
})
export class QuestionListComponent implements OnInit {

  constructor(private questionService: QuestionService, private answerService: AnswerService) { }

  private ids: string[] = [];
  private questions: Question[] = []
  private subjects:string[]= ["its", "wi", "bwl"]
  private selectedSubject:string = ''
  private selectedSubjectIndex:number;
  private subjectSelected:boolean = false;
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

  getSubject(index:number){
   
    this.selectedSubject = this.subjects[index]
    this.selectedSubjectIndex = index;
    this.subjectSelected = true;
     console.log("selected subject:", this.selectedSubject)
  }
}
