import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizRunnerComponent } from './quiz-runner.component';
import { RouterModule } from '@angular/router';
import { QuizRunnerService } from './quiz-runner.service';
import { QuizService } from '../core/services/quiz.service';
import { QuestionFormComponent } from './question-form/question-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    QuizRunnerComponent,
    QuestionFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':quizTag',
        component: QuizRunnerComponent
      },
      {
        path: '**',
        redirectTo: '/dashboard'
      }
    ]),
    FormsModule
  ],
  providers: [
    QuizRunnerService,
    QuizService
  ]
})
export class QuizRunnerModule { }
