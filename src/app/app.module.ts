import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms'
import {HighlightDirective} from './Directives/highlight.directive';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';
import { DataComponent } from './data/data.component';
import {AppRoutingModule,RoutableComponents} from 'app/app.routing.module';
import { DoneComponent } from './done/done.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { SelectComponent } from './select/select.component'
import { MyErrorHandler} from './errorHandler/errorhandler.component'
@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    AnswerComponent,
    DataComponent,
    RoutableComponents,
    DoneComponent,
    HighlightDirective,
    QuestionListComponent,
    SelectComponent,

  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [ { provide: ErrorHandler, useClass: MyErrorHandler } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
