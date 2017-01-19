import { AnswerService } from '../services/answer.service';
import { Component, OnInit, OnChanges,ViewChild,ElementRef, Injectable, Output, EventEmitter, Input, animate, style, trigger, state, transition } from '@angular/core';
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
  private correctAnswerCount: number = 0;
  private isLoaded = false;
  private isHoverAnswer:boolean = true;
  private answerIndex:number;

  @Output() public nextQuestion = new EventEmitter<boolean>();
  @Input() questionId: string = '';
  @Input() state: string = ''
  @Output() answersLoaded:EventEmitter<boolean> = new EventEmitter<boolean>();

  
   constructor(private answerService: AnswerService) { 

  
  }

  ngOnChanges(changes: SimpleChanges) {
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
      () => { console.log("Answer retrieve completed"), this.isLoaded = true; });
  }



select(index,answer: Answer) { 
  this.selectedAnswer = answer;
  this.answerIndex = index;
  console.log(this.selectedAnswer);
}
get answerIsCorrect(): boolean { return this.selectedAnswer.isCorrect };

toggleState(id:string) {


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