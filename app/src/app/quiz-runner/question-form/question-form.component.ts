import { ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuizQuestion } from 'src/app/core/models/quiz.model';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionFormComponent implements OnInit {

  @Input() question: QuizQuestion | null = null;

  @Input() questionIndex: number = 0;

  @Input()
  set savedAnswer(value: any) {
    this.answer = value;
  }

  @Output() onSubmit = new EventEmitter<any>();

  answer: any = '';

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    this.onSubmit.emit(this.answer);
  }

}
