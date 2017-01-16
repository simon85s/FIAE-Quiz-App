import { AnswerService } from '../services/answer.service';
import { Component, OnInit, OnChanges, Injectable, Output, EventEmitter, Input, animate, style, trigger, state, transition } from '@angular/core';
import { HighlightDirective } from '../Directives/highlight.directive';
import { SimpleChanges } from '@angular/core'

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
      transition('fadeOut => *', [
        style({
          opacity: '0', transform: 'translateX(335px)'
        }),

        animate('500ms')
      ]),
      state('fadeOut', style({
        opacity: '1'
      })),
      transition('* => *', [
        style({
          opacity: '0', transform: 'translateX(100px)'
        }),

        animate('500ms')
      ]),
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
  private color: string = '#0088c5';
  private correctAnswerCount: number = 0;
  private isLoaded = false;

  @Output() public nextQuestion = new EventEmitter<boolean>();
  @Input() questionId: string = '';
  @Input() state: string = ''

  constructor(private answerService: AnswerService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['questionId'] != null) {
      this.getAnswers(this.questionId);
    }
  }


  getAnswers(id: string) {
    this.answers.length = 0;
    this.color = 'grey';
    this.answerService.getAnswers(id)
      .subscribe(answer => {
        this.answers.push(new Answer(answer._id, answer.questionid, answer.answer, answer.iscorrect))
      },
      error => console.log(error),
      () => { console.log("Answer retrieve completed"), this.isLoaded = true; });
  }


  select(answer: Answer) { this.selectedAnswer = answer };

  get answerIsCorrect(): boolean { return this.selectedAnswer.isCorrect };

  toggleState(button: HTMLElement) {

    this.color = this.answerIsCorrect ? 'green' : 'red'
    this.nextTimeout = setTimeout(() => {
      this.nextQuestion.emit(true);
      this._markedAnswer = -1;
      this.nextTimeout = null;
    }, 500);
  }

  get hasMarkedAnswer() {
    return this._markedAnswer > -1;
  }

  get markedAnswer() {
    return this._markedAnswer;
  }

  get correctCount() {

    this.selectedAnswers.filter(a => a.isCorrect).forEach((a => this.correctAnswerCount++))
    return this.correctAnswerCount
  }

  public answerClicked(index, checked) {
    if (!checked) {
      this._markedAnswer = -1;

      return;
    }
    this._markedAnswer = index;
    this.selectedAnswers.push(this.selectedAnswer);
  }
}

export class Answer {

  constructor(public id: string,
    public questionId: string,
    public answer: string,
    public isCorrect: boolean,
  ) { }
}