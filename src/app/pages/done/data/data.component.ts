import { Component, OnInit, Input } from '@angular/core';
import { Answer, Question } from '../../pages/pages'
import { AnswerService, QuestionService } from '../../shared/shared'
import { Observable,Subject } from 'rxjs'
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
  subjects: Array<string> = ["bwl", "its", "wi"]
  selectedSubject: string = 'bwl';
  stream$ = new Subject<string>()

  ngOnInit() {
    /*Initialize Form*/
    this.form = this.fb.group({
      subject: ["bwl",],
      questionTitle: ['', [Validators.required, Validators.maxLength(75), Validators.minLength(4)]],
      answer1: ['', [Validators.required]],
      answer2: ['', [Validators.required]],
      answer3: ['', [Validators.required]],
      answer4: new FormControl('', []),
      checkbox1: new FormControl('', []),
      checkbox2: new FormControl('', []),
      checkbox3: new FormControl('', []),
      checkbox4: new FormControl('', [])
    })
    this.form.valueChanges.subscribe(a => console.log(a))
  }

  generateNewAnswers(a1: string, a2: string, a3: string, a4: string, c1: boolean, c2: boolean, c3: boolean, c4: boolean)  {

  //  debugger;
  //     this.newAnswers.length = 0;
  //     this.newAnswers.push(

  //       new Answer(null, this.questionId, a1, c1),
  //       new Answer(null, this.questionId, a2, c2),
  //       new Answer(null, this.questionId, a3, c3))
  //     /*Optional Question*/
  //     if (a4 != "") this.newAnswers.push(new Answer(null, this.questionId, a4, c4))

  //     console.log("1",this.newAnswers)

  //   this.answerService.submitNewAnswers(this.newAnswers).delay(500).subscribe()
    
  }

  generateNewQuestion = () => {

 
    let question = new Question(undefined, this.question, this.selectedSubject)
    // this.questionService.submitNewQuestion(question)
    //   .subscribe(e => { }, error => console.log(error), () => {
    //     console.log("Question inserted...calling Service to insert Answers"), this.questionService.getLastQuestionId()
    //       .subscribe(q => this.questionId = q[q.length - 1]._id,
    //       error => console.log(error), () => { console.log("created Answers"), location.reload() })
    //   });

    this.questionService.submitnewQuestion(question).subcribe(c => console.log(c))
  }
}






