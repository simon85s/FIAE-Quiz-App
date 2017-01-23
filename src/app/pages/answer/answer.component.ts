import { AnswerService } from '../../shared/shared';
import { Component, OnInit, OnChanges,Injectable, Output, EventEmitter, Input, animate, style, trigger, state, transition } from '@angular/core';
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
  private isLoaded = false;
  private isHoverAnswer: boolean = true;
  private answerIndex: number = 6;
  private answerUnicodeString: any

  @Output() public nextQuestion = new EventEmitter<boolean>();
  @Output() answersLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() questionId: string = '';
  @Input() state: string = ''



  constructor(private answerService: AnswerService) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes")
    if (changes['questionId'] != null) {
      this.getAnswers(this.questionId);
    }
  }


  getAnswers(id: string) {
    this.answers.length = 0;

    this.answerService.getAnswers(id)
      .subscribe(answer => {
        this.answers.push(new Answer(answer._id, answer.questionid, answer.answer, answer.iscorrect))
      },
      error => console.log(error),
      () => { console.log("Answer retrieve completed"), this.isLoaded = true, this.answersLoaded.emit(true); });
  }



  select(index, answer: Answer) {
    this.selectedAnswer = answer;
    this.answerIndex = index;
    console.log(this.selectedAnswer);
  }
  get answerIsCorrect(): boolean { return this.selectedAnswer.isCorrect };

  toggleState(id: string) {


    this.selectedAnswers.push(this.selectedAnswer);
    this.nextTimeout = setTimeout(() => {
      this.nextQuestion.emit(true);
      this.answerIndex = 5;
      this._markedAnswer = -1;
      this.nextTimeout = null;
    }, 2000);
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
}

export class Answer {

  constructor(public id: string,
    public questionId: string,
    public answer: string,
    public isCorrect: boolean,
  ) { }
}