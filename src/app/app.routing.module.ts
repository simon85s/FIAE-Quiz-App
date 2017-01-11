import {Routes,RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DataComponent} from './data/data.component';
import {QuestionComponent} from './question/question.component'
import {DoneComponent} from './done/done.component'
const routes:Routes =
[
 {
     path:'app-data', component: DataComponent,
 },
 {
     path: 'app-question', component: QuestionComponent
 },
 {
     path:'app-done', component: DoneComponent
 }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}


export const RoutableComponents = [
    QuestionComponent,
    DataComponent,
    DoneComponent
]