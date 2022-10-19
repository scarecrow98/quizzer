import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QuizService } from '../core/services/quiz.service';

@Component({
  selector: 'app-my-quizes',
  templateUrl: './my-quizzes.component.html',
  styleUrls: ['./my-quizzes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyQuizzesComponent implements OnInit {

  quizzes$ = this.service.getQuizzes();
  
  constructor(private service: QuizService) { }

  ngOnInit(): void {
  }

}
