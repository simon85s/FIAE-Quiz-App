import {AnswerService} from './services/answer.service'
import {QuestionService} from './services/question.service'

export * from './services/answer.service';
export * from './services/question.service';

export const SERVICES = [AnswerService,QuestionService]