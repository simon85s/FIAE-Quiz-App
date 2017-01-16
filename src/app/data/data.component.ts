import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../question/question.component'
import { Answer } from '../answer/answer.component'
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { Observable } from 'rxjs'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  providers: [QuestionService, AnswerService]
})
export class DataComponent implements OnInit {

  constructor(private questionService: QuestionService, private answerService: AnswerService, private fb: FormBuilder) { }

  questionId: string;
  form: FormGroup;
  question: string;
  newAnswers: Answer[] = []
  subjects:Array<string>= ["BWL", "ITS" , "WIRTSCHAFT"]
  selectedSubject:string = ''

  ngOnInit() {


    this.form = this.fb.group({
      s:["",Validators.required],
      questionTitle: ["",Validators.required],
      answer1: ["", Validators.required,Validators.minLength(10)],
      answer2: ["", Validators.required,Validators.minLength(10)],
      answer3: ["", Validators.required,Validators.minLength(10)],
      answer4: ["", Validators.required,Validators.minLength(10)]
    })
    // this.form.valueChanges.subscribe(data => console.log(data));
  }

  generateNewAnswers = (a1: string, a2: string, a3: string, a4: string, c1: boolean, c2: boolean, c3: boolean, c4: boolean) => {

    setTimeout(() => {

      this.newAnswers.push(

        new Answer(null, this.questionId, a1, c1),
        new Answer(null, this.questionId, a2, c2),
        new Answer(null, this.questionId, a3, c3),
        new Answer(null, this.questionId, a4, c4))

      this.answerService.submitNewAnswers(this.newAnswers).subscribe()
    }, 2500)
  }

  generateNewQuestion = () => {
    let question = new Question(undefined,this.question,this.selectedSubject)
    this.questionService.submitNewQuestion(question)
      .subscribe(null, error => console.log(error), () => {
        console.log("Question inserted...calling Service to insert Answers"), this.questionService.getLastQuestionId()
          .subscribe(q => this.questionId = q[q.length - 1]._id,
          error => console.log(error), () => { console.log("created Answers"), this.ngOnInit() })
      });
  }
}






