import { Component, OnInit, Inject, Input, Output, EventEmitter, trigger, state, style, transition, animate } from '@angular/core';
import { QuestionService } from '../../shared/shared';
import { DoneComponent } from '../../pages/pages';
import { Router } from '@angular/router'
import { shuffle } from '../../helpers/common';

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

        animate('500ms')
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
  isLoading: boolean = true;
  state: string = 'fadeIn'
  questionId: string;
  count: number = 1;
  subject: string;
 

  ngOnInit() {
    
    /*get the selected subject via url*/
    let subj = this.router.url.substring(this.router.url.lastIndexOf('/') + 1)

    /*filter questions depending on subject and retrieve 50 questions from service*/
    this.questionService.getQuestions().filter(q => q.subject == subj).take(50).delay(2500)
      .subscribe(question => {

        /*generate question objects from the retrieved json and push to array*/
        this.questions.push(new Question(question._id, question.title, question.subject));
        /*shuffle questions and pick 10*/
        this.selectRandomQuestions(this.questions);
        /*select the starting question and set the id*/
        this.currentQuestion = this.randomQuestions[0];
        this.questionId = this.currentQuestion.id;
      },
      error => console.log(error),
      () => { this.isLoading = false, console.log("Question retrieve completed") });
  }

  selectRandomQuestions(questions: Question[]) {
    this.randomQuestions = shuffle(questions).slice(0, 10);
  }

  /*returns the current question index*/
  getNextQuestion(): number {

    this.questionIndex = (this.questionIndex < this.length - 1) ? this.questionIndex + 1 : -1
    this.count = (this.count < this.length) ? this.count + 1 : 1;
    return this.questionIndex;
  }

  /*selects the next question from the question array*/
  nextQuestion(next: boolean) {

    if (next) {
      this.currentQuestion.isanswered = true;

      if (this.getNextQuestion() !== -1) {
        this.currentQuestion = this.randomQuestions[this.questionIndex]
        this.questionId = this.currentQuestion.id;
      }
      else {
        /*when all questions are answered we navigate to the done page*/
        setTimeout(() =>
          this.router.navigate(['/app-done']), 50
        )
      }
    }
  }


  get length(): number {
    return this.randomQuestions.length
  }

  get isAnswered():boolean {
    return this.currentQuestion.isanswered
  }
}


export class Question {

  constructor(
    public id: string,
    public title: string,
    public subject: string,
    public isanswered?: boolean
  ) {
    this.isanswered = false;
  }
}

