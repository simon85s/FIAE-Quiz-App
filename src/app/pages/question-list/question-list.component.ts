import { Component, OnInit } from '@angular/core';
import { Question } from '../question/question.component';
import { AnswerService,QuestionService,FilterPipe } from '../../shared/shared';
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
      this.questionService.deleteQuestion(question._id).delay(250)
      .subscribe(e => console.log("Deleting question"), (e) => location.reload(true), 
      () => location.reload(true))
  }

  getSubject(index:number){
   
    this.selectedSubject = this.subjects[index]
    this.selectedSubjectIndex = index;
    this.subjectSelected = true;
     console.log("selected subject:", this.selectedSubject)
  }
}
