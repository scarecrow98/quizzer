import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQuizComponent } from './create-quiz.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { QuizFormQuestionComponent } from './quiz-form-question/quiz-form-question.component';



@NgModule({
  declarations: [
    CreateQuizComponent,
    QuizFormComponent,
    QuizFormQuestionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CreateQuizComponent }
    ]),
    ReactiveFormsModule
  ]
})
export class CreateQuizModule { }
