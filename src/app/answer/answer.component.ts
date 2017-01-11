import { AnswerService } from '../services/answer.service';
import { Component, OnInit, OnChanges, Injectable, Output, EventEmitter, Input, animate, style, trigger, state, transition } from '@angular/core';
import { HighlightDirective } from '../Directives/highlight.directive';

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
          opacity: '0', transform: 'translateX(-35px)'
        }),

        animate('1000ms')
      ]),
      state('fadeOut', style({
        opacity: '1'
      })),
      transition('* => *', [
        style({
          opacity: '0', transform: 'translateX(-35px)'
        }),

        animate('1000ms')
      ]),
    ]
  )]
})

@Injectable()
export class AnswerComponent implements OnChanges {

  state: string = 'fadeIn';

  private answers: Answer[] = []
  private selectedAnswer: Answer;
  private selectedAnswers: Answer[] = []
  private _markedAnswer: number = -1;
  private nextTimeout: any = null;
  private color: string = 'grey';
  private correctAnswerCount: number = 0;
  private isLoaded = false;

  @Output() public nextQuestion = new EventEmitter<boolean>();
  @Input() questionId: string = '';

  constructor(private answerService: AnswerService) { }


  ngOnChanges(changes: any) {
    this.getAnswers(this.questionId);
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


  select(answer: Answer) {
    this.selectedAnswer = answer;
    console.log(this.selectedAnswer)
  }
  get answerIsCorrect(): boolean {
    return this.selectedAnswer.isCorrect === 'true';
  }

  toggleState(button: HTMLElement) {

    this.color = this.answerIsCorrect ? 'green' : 'red'

    this.nextTimeout = setTimeout(() => {
      this.nextQuestion.emit(true);
      this._markedAnswer = -1;
      this.nextTimeout = null;
    }, 1500);
  }

  get hasMarkedAnswer() {
    return this._markedAnswer > -1;
  }

  get markedAnswer() {
    return this._markedAnswer;
  }

  get correctCount() {

    this.selectedAnswers.filter(a => a.isCorrect === 'true').forEach((a => this.correctAnswerCount++))
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
    public isCorrect: string,
  ) { }
}