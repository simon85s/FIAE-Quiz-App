import { Component, OnInit, Input, Output, EventEmitter, trigger, state, style, transition, animate } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Router } from '@angular/router'
import { shuffle } from '../helpers/common';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  providers: [QuestionService],
  animations: [trigger(
    'myTrigger', [

      state('fadeIn', style({
        opacity: '1'
      })),
      transition('void => *', [
        style({
          opacity: '0', transform: 'translateX(20px)'
        }),

        animate('1750ms')
      ])
    ]
  )]
})
export class QuestionComponent implements OnInit {

  constructor(private questionService: QuestionService, private router: Router) { }

  questions: Array<Question> = [];
  randomQuestions: Array<Question> = []
  questionIndex: number = 0;
  currentQuestion: Question;
  isLoaded: boolean = false;
  state: string = 'fadeIn'
  questionId: string;
  count: number = 1;


  ngOnInit() {

    this.randomQuestions = [];
    this.questionService.getQuestions()
      .subscribe(question => {
        this.questions.push(new Question(question._id, question.title));
        console.log(this.questions)
        this.selectRandomQuestions(this.questions);
        this.currentQuestion = this.randomQuestions[0];
        this.questionId = this.currentQuestion.id;
      },
      error => console.log(error),
      () => { this.isLoaded = true, console.log("Question retrieve completed") });
  }
  //Shuffle Questions and Pick 10
  selectRandomQuestions(questions: Question[]) {
    this.randomQuestions = shuffle(questions).slice(0, 10);
  }

  getNextQuestion(): number {

    this.questionIndex = (this.questionIndex < this.length - 1) ? this.questionIndex + 1 : -1
    this.count = (this.count < this.length) ? this.count + 1 : 1;
    return this.questionIndex;
  }

  nextQuestion(next: boolean) {

    if (next) {
      this.currentQuestion.isanswered = "true";
      if (this.getNextQuestion() !== -1) {
        this.currentQuestion = this.randomQuestions[this.questionIndex]
        this.questionId = this.currentQuestion.id;
      }
      else {
        setTimeout(() =>
          this.router.navigate(['/app-done']), 250
        )
      }
    }
  }

  get length(): number {
    return this.randomQuestions.length
  }

  get isAnswered() {
    return this.currentQuestion.isanswered
  }
}


export class Question {

  constructor(
    public id: string,
    public title: string,
    public isanswered?: string) {
    this.isanswered = "false";
  }
}

