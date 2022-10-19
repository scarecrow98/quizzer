import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { QuizService } from '../core/services/quiz.service';

@Component({
  selector: 'app-quiz-runner',
  templateUrl: './quiz-runner.component.html',
  styleUrls: ['./quiz-runner.component.scss']
})
export class QuizRunnerComponent implements OnInit {

  quizResult$ = this.route.params.pipe(
    switchMap(params => this.quizService.getQuizByTag(params['quizTag']))
  );

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
    ) {
  }

  ngOnInit(): void {
  }

}
