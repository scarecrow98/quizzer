import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, fromEvent, map, startWith, Subscription, withLatestFrom } from 'rxjs';
import { Quiz } from '../core/models/quiz.model';
import { QuizService } from '../core/services/quiz.service';

@Component({
  selector: 'app-my-quizes',
  templateUrl: './my-quizzes.component.html',
  styleUrls: ['./my-quizzes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyQuizzesComponent implements OnInit, OnDestroy {

  private _quizzes$ = new BehaviorSubject<Quiz[]>([]);

  private _filteredQuizzes$ = new BehaviorSubject<Quiz[]>([]);

  private _sub: Subscription | null = null;

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  public filteredQuizzes$ = this._filteredQuizzes$.asObservable();

  constructor(private service: QuizService) {
    this.service.getQuizzes().subscribe(quizzes => {
      this._quizzes$.next(quizzes);
      this._filteredQuizzes$.next(quizzes);
    });
  }

  ngOnInit(): void {
    this._sub = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => this.searchInput.nativeElement.value.toLocaleLowerCase()),
      debounceTime(1000),
      distinctUntilChanged(),
      withLatestFrom(this._quizzes$)
    ).subscribe(([search, quizzes]) => {
      this._filteredQuizzes$.next(
        quizzes.filter(q => q.title.toLocaleLowerCase().includes(search))
      );
    });
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }


}
