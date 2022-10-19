import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizRunnerComponent } from './quiz-runner.component';
import { RouterModule } from '@angular/router';
import { QuizRunnerService } from './quiz-runner.service';
import { QuizService } from '../core/services/quiz.service';



@NgModule({
  declarations: [
    QuizRunnerComponent
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
    ])
  ],
  providers: [
    QuizRunnerService,
    QuizService
  ]
})
export class QuizRunnerModule { }
