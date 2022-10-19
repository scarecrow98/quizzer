import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyQuizzesComponent } from './my-quizzes.component';
import { RouterModule } from '@angular/router';
import { QuizListComponent } from './quiz-list/quiz-list.component';



@NgModule({
  declarations: [
    MyQuizzesComponent,
    QuizListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MyQuizzesComponent }
    ])
  ]
})
export class MyQuizzesModule { }
