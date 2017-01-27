import {Routes,RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DataComponent} from './pages/pages';
import {QuestionComponent} from './pages/pages';
import {QuestionListComponent} from './pages/pages';
import {DoneComponent} from './pages/pages';
import {SelectComponent} from './pages/pages';



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
 },
 { path: '',   redirectTo: '/app-select', pathMatch: 'full' 
 },
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