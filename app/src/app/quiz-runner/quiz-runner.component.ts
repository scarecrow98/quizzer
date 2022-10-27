import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, filter, map, of, switchMap, take } from 'rxjs';
import { Quiz, QuizQuestion } from '../core/models/quiz.model';
import { QuizService } from '../core/services/quiz.service';

@Component({
  selector: 'app-quiz-runner',
  templateUrl: './quiz-runner.component.html',
  styleUrls: ['./quiz-runner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizRunnerComponent implements OnInit {

  private readonly _stepDirection$ = new BehaviorSubject<number>(0);

  private readonly _userAnswers$ = new BehaviorSubject<any[] | null>(null);

  private readonly _quiz$ = new BehaviorSubject<Quiz | null>(null);

  private readonly _currentQuestion$ = combineLatest([
    this._quiz$,
    this._stepDirection$,
  ]).pipe(
    switchMap(([quiz, stepDirection]) => {
      if (!quiz) {
        return of(null);
      }

      let ci = this.currentIndex + stepDirection;
      if (ci < 0) ci = quiz.questions.length - 1;

      this.currentIndex = Math.abs((ci) % quiz.questions.length);
      const currentQuestion: QuizQuestion = quiz.questions[this.currentIndex];

      return of(currentQuestion);
    })
  );

  private currentIndex: number = 0;

  vm$ = combineLatest([
    this._userAnswers$,
    this._quiz$,
    this._currentQuestion$
  ]).pipe(
    map(([answers, quiz, currentQuestion]) => ({ answers, quiz, currentQuestion }))
  );

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    ) {

    this.route.params.pipe(
      switchMap(params => this.quizService.getQuizByTag(params['quizTag']))
    ).subscribe(result => {
      this._quiz$.next(result.quiz);

      if (result.quiz) {
        this.syncUserAnswers(result.quiz.id);
      }
    })
  }

  ngOnInit(): void {
  }

  advanceQuestionIndex(direction: number) {
    this._stepDirection$.next(direction);
  }

  submit(questionId: number, answer: any) {
    this.quizService.saveQuizAnswer(questionId, answer).subscribe(result => {
      if (!result.success) {
        alert(result.message);
      } else {
        alert('Answer saved!');
      }
    });
  }
  
  private syncUserAnswers(quizId: number) {
    this.quizService.getQuizUserAnswers(quizId).subscribe(answers => {
      this._userAnswers$.next(answers);
    });
  }

}
