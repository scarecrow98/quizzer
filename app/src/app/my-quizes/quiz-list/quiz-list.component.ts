import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Quiz } from 'src/app/core/models/quiz.model';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizListComponent implements OnInit {

  @Input() quizzes: Quiz[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
