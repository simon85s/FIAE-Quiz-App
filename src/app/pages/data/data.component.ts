import { Component, OnInit, Input } from '@angular/core';
import { Answer, Question } from '../../pages/pages';
import { AnswerService, QuestionService } from '../../shared/shared';
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

  private questionId: string;
  private form: FormGroup;
  private question: string;
  private newAnswers: Answer[] = []
  private subjects: Array<string> = ["bwl", "its", "wi"]
  private selectedSubject: string = 'bwl'
  private isLoading:boolean = false;

  ngOnInit() {

    /*Initialize Form and set Form Validation*/
    this.newAnswers.length = 0;
    this.form = this.fb.group({
      subject: ['',],
      questionTitle: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(4)]],
      answer1: ['', [Validators.required]],
      answer2: ['', [Validators.required]],
      answer3: ['', [Validators.required]],
      answer4: new FormControl('', []),
      checkbox1: new FormControl('', []),
      checkbox2: new FormControl('', []),
      checkbox3: new FormControl('', []),
      checkbox4: new FormControl('', [])
    })
    this.form.valueChanges.subscribe(changes => console.log("FormControl changed:", changes))
  }

  /*Generates */
  generateNewQuestion = (a1: string, a2: string, a3: string, a4: string, c1: boolean, c2: boolean, c3: boolean, c4: boolean) => {
    this.isLoading = true;
    let question = new Question(undefined, this.question, this.selectedSubject)
    this.questionService.submitNewQuestion(question).subscribe(a => this.questionId = a._id, (e) => { }, ()
      => {
      
      this.newAnswers.length = 0;
      this.newAnswers.push(

        new Answer(null, this.questionId, a1, c1),
        new Answer(null, this.questionId, a2, c2),
        new Answer(null, this.questionId, a3, c3),
        new Answer(null, this.questionId, a4, c4))

      this.answerService.submitNewAnswers(this.newAnswers).delay(1000).subscribe(a => console.log("answer generated with questionid"),
      (e) => console.log(e), () => {location.reload(), this.isLoading = false});
    })
  }









