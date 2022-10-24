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

  @Output() onSubmit = new EventEmitter<{
    questionId: number,
    answer: string
  }>();

  @Input() form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    this.onSubmit.emit({
      answer: this.form.value.answer,
      questionId: this.question!.id
    });
  }

}
