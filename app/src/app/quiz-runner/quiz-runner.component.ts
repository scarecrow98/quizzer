import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, of, shareReplay, switchMap } from 'rxjs';
import { QuizQuestion } from '../core/models/quiz.model';
import { QuizService } from '../core/services/quiz.service';

@Component({
  selector: 'app-quiz-runner',
  templateUrl: './quiz-runner.component.html',
  styleUrls: ['./quiz-runner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizRunnerComponent implements OnInit {

  private _stepDirection$ = new BehaviorSubject<number>(0);

  quizResult$ = this.route.params.pipe(
    switchMap(params => this.quizService.getQuizByTag(params['quizTag'])),
    shareReplay(1)
  );

  private _userAnswers$ = this.quizResult$.pipe(
    switchMap(result => this.quizService.getQuizUserAnswers(result.quiz!.id))
  );

  currentQuestion$ = combineLatest([
    this.quizResult$,
    this._stepDirection$,
    this._userAnswers$
  ]).pipe(
    switchMap(([quizResult, stepDirection, answers]) => {
      const quiz = quizResult.quiz;
      if (!quiz) {
        return of(null);
      }

      let ci = this.currentIndex + stepDirection;
      if (ci < 0) ci = quiz.questions.length - 1;

      this.currentIndex = Math.abs((ci) % quiz.questions.length);
      const currentQuestion: QuizQuestion = quiz.questions[this.currentIndex];

      //beállítom a formon a user már meglévő válaszát, ha van
      const userAnswer = answers.find((a: any) => a.id === currentQuestion.id)?.answers[0];
      if (userAnswer) {
        this.form.setValue({ answer: userAnswer.answer });
        this.form.updateValueAndValidity();
      } else {
        this.form.setValue({ answer: '' })
      }

      return of(currentQuestion);
    })
  );

  form = new FormGroup({
    answer: new FormControl('')
  });

  currentIndex: number = 0;


  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
    ) {
  }

  ngOnInit(): void {
  }

  advanceQuestionIndex(direction: number) {
    this._stepDirection$.next(direction);
  }

  submit(event: { answer: string, questionId: number }) {
    this.quizService.saveQuizAnswer(event.questionId, event.answer).subscribe(result => {
      if (!result.success) {
        alert(result.message);
      } else {
        alert('Answer saved!');
      }
    });
  }

}
