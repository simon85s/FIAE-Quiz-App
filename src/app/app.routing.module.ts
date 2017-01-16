import {Routes,RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DataComponent} from './data/data.component';
import {QuestionComponent} from './question/question.component';
import {QuestionListComponent} from './question-list/question-list.component';
import {DoneComponent} from './done/done.component';
import {SelectComponent} from './select/select.component';

const routes:Routes =
[
 {
     path:'app-data', component: DataComponent
 },
 {
     path: 'app-question/bwl', component: QuestionComponent,
 },
 {
     path: 'app-question/its', component: QuestionComponent,
 },
 {
     path: 'app-question/wi', component: QuestionComponent,
 },
 {
     path:'app-done', component: DoneComponent
 },
 {
    path: 'app-question-list', component: QuestionListComponent
 },
 {
     path:'app-select', component: SelectComponent
 }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}


export const RoutableComponents = [
    QuestionComponent,
    QuestionListComponent,
    DataComponent,
    DoneComponent,
    SelectComponent
]