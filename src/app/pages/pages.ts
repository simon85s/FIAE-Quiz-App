import {AnswerComponent,Answer} from './answer/answer.component';
import {Question,QuestionComponent} from './question/question.component';
import {DataComponent} from './data/data.component';
import {QuestionListComponent} from './question-list/question-list.component';
import {SelectComponent} from './select/select.component';
import {DoneComponent} from './done/done.component';
import {HeaderComponent} from './header/header.component';

export * from './header/header.component';
export * from './done/done.component';
export * from './select/select.component';
export * from './data/data.component';
export * from './question/question.component';
export * from './answer/answer.component';
export * from './question-list/question-list.component';

export const PAGES = [
QuestionComponent,
DataComponent,
QuestionListComponent,
AnswerComponent,
SelectComponent,
HeaderComponent,
DoneComponent]