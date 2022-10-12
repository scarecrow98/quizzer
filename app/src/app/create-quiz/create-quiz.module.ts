import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQuizComponent } from './create-quiz.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { QuizFormQuestionComponent } from './quiz-form-question/quiz-form-question.component';
import { CreateQuizService } from './create-quiz.service';



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
  ],
  providers: [
    CreateQuizService
  ]
})
export class CreateQuizModule { }
