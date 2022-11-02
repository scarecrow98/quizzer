import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizMonitorComponent } from './quiz-monitor.component';
import { RouterModule } from '@angular/router';
import { QuizService } from '../core/services/quiz.service';
import { SocketIoModule } from 'ngx-socket-io';
import { NgChartsModule } from 'ng2-charts';
import { AnswerChartComponent } from './answer-chart/answer-chart.component';

@NgModule({
  declarations: [
    QuizMonitorComponent,
    AnswerChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':quizTag',
        component: QuizMonitorComponent
      },
      {
        path: '**',
        redirectTo: '/dashboard'
      }
    ]),
    SocketIoModule,
    NgChartsModule
  ],
  providers: [
    QuizService
  ]
})
export class QuizMonitorModule { }
