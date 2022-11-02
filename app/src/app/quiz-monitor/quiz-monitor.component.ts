import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LOCAL_STORAGE_KEYS } from '../core/constants';
import { Quiz } from '../core/models/quiz.model';
import { QuizService } from '../core/services/quiz.service';
import { SocketService } from './socket.service';
import { AnswerStatEntry } from './models';



@Component({
  selector: 'app-quiz-monitor',
  templateUrl: './quiz-monitor.component.html',
  styleUrls: ['./quiz-monitor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizMonitorComponent implements OnInit, OnDestroy {

  public readonly stats$ = new BehaviorSubject<AnswerStatEntry[]>([]);

  private _quiz$ = new BehaviorSubject<Quiz | null>(null);

  private socketService: SocketService | null = null;

  // @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router
  ) {
    this.route.params.pipe(
      switchMap(params => this.quizService.getQuizByTag(params['quizTag']))
    ).subscribe(result => {
      if (result.quiz) {
        this._quiz$.next(result.quiz);
        this._setupSocketConnection(result.quiz);
      } else {
        this.router.navigate([ '/dashboard' ]);
      }
      
    });
  }

  ngOnInit(): void {
    // this.container.nativeElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.socketService?.socket.removeAllListeners();
    this.socketService?.socket.disconnect();
  }

  updateDiagrams(data: Record<number, AnswerStatEntry>) {
    this.stats$.next(Object.values(data));
    // this.container.nativeElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  private _setupSocketConnection(quiz: Quiz) {
    this.socketService = new SocketService(
      environment.socketUrl,
      localStorage.getItem(LOCAL_STORAGE_KEYS.JWT_TOKEN) || '',
      quiz.tag
    );

    this.socketService.socket.on('connect', () => {
      console.log('socket connected');
    });

    this.socketService.socket.on('disconnect', () => {
      console.log('socket disconnected');
    });

    this.socketService.socket.on('error', () => {
      console.log('socket error');
    });

    this.socketService.socket.on('update', (message: any) => {
      this.updateDiagrams(message);
    });
  }

}
