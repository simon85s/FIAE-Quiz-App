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
  newQuestion: Question;
  newAnswers: Answer[] = []


  ngOnInit() {

    this.form = new FormGroup({
      'questionTitle': new FormControl('', Validators.required),
      'answer1': new FormControl('', Validators.required),
      'answer2': new FormControl('', Validators.required),
      'answer3': new FormControl('', Validators.required),
      'answer4': new FormControl('', Validators.required)
    })

    this.form.valueChanges.subscribe(data => console.log(data));
  }

  generateNewAnswers = (a1: string, a2: string, a3: string, a4:string, c1: boolean, c2: boolean, c3: boolean,c4:boolean) => {

    setTimeout(() => {
      console.log(a4)
       console.log(c4)
      this.newAnswers.push(

        new Answer(null, this.questionId, a1, c1),
        new Answer(null, this.questionId, a2, c2),
        new Answer(null, this.questionId, a3, c3),
        new Answer(null, this.questionId, a4, c4))

      this.answerService.submitNewAnswers(this.newAnswers).subscribe()
    }, 2500)
  }

  generateNewQuestion = () => {

    this.questionService.submitNewQuestion(this.newQuestion)
      .subscribe(null, error => console.log(error), () => {
        console.log("Question inserted...calling Service to insert Answers"), this.questionService.getLastQuestionId()
          .subscribe(q => this.questionId = q[q.length - 1]._id,
          error => console.log(error), () => { console.log("created Answers"), this.ngOnInit() })
      });
  }
}






