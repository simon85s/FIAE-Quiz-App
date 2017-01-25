import { AnswerService } from '../../shared/shared';
import { Component, OnInit, OnChanges, Injectable, Output, EventEmitter, Input, animate, style, trigger, state, transition } from '@angular/core';
import { SimpleChanges } from '@angular/core'
import { shuffle } from '../../helpers/common';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
  providers: [AnswerService],
  animations: [trigger(
    'myTrigger', [

      state('fadeIn', style({
        opacity: '1'
      })),
      transition('void => *', [
        style({ transform: 'translateX(100%)', opacity: 0 }),

        animate('600ms')
      ])
    ]
  )]
})

@Injectable()
export class AnswerComponent implements OnChanges {

  private answers: Answer[] = []
  private selectedAnswer: Answer;
  private selectedAnswers: Answer[] = []
  private _markedAnswer: number = -1;
  private nextTimeout: any = null;
  private correctAnswerCount: number = 0;
  private answerIndex: number = 6;
  private buttonHover: boolean = true;

  @Output() public nextQuestion = new EventEmitter<boolean>();
  @Output() answersLoading = new EventEmitter<boolean>();
  @Input() questionId: string = '';
  @Input() state: string = ''

  
  constructor(private answerService: AnswerService) { }

  ngOnChanges(changes: SimpleChanges):void {
    console.log("changes")
    if (changes['questionId'] != null) {
      this.getAnswers(this.questionId);
    }
  }

  /*Retrieve answers from the service*/
  getAnswers(id: string):void {
    this.answers.length = 0;
    this.answerService.getAnswers(id)
      .subscribe(answer => {
        this.answers.push(new Answer(answer._id, answer.questionid, answer.answer, answer.iscorrect))
      }),
      error => console.log(error),
      () => {
        console.log("Answer retrieve completed"),
          this.answers = this.shuffleAnswers(this.answers),
          this.answersLoading.emit(false)
      };
  }

  /*shuffle answer array*/
  shuffleAnswers(answers: Answer[]):Answer[] {
    return shuffle(answers);
  }
  /*set the selected answer*/
  select(index, answer: Answer):void {
    this.selectedAnswer = answer;
    this.answerIndex = index;
    console.log(this.selectedAnswer);
  }

  toggleState(id: string):void {

    this.selectedAnswers.push(this.selectedAnswer);
    this.nextTimeout = setTimeout(() => {
      this.nextQuestion.emit(true);
      this.answerIndex = 5;
      this._markedAnswer = -1;
      this.nextTimeout = null;
    }, 2000);
  }
  /*Methods to show the footer depending on hover event*/
  onHovering(event: any):void {
    this.buttonHover = false;
  }

  onUnovering(event: any):void {

    this.buttonHover = true;
  }
  /*Getter Methods*/
  get hasMarkedAnswer():boolean {
    return this._markedAnswer > -1;
  }

  get markedAnswer():number {
    return this._markedAnswer;
  }

  get correctCount():number {

    this.selectedAnswers.filter(a => a.isCorrect).forEach((a => this.correctAnswerCount++))
    return this.correctAnswerCount
  }
  get answerIsCorrect(): boolean {
    return this.selectedAnswer.isCorrect
  };
}

export class Answer {

  constructor(public id: string,
    public questionId: string,
    public answer: string,
    public isCorrect: boolean,
  ) { }
}