import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quiz-form-question',
  templateUrl: './quiz-form-question.component.html',
  styleUrls: ['./quiz-form-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizFormQuestionComponent implements OnInit {

  @Input() formGroup: FormGroup | null = null;

  @Input() questionNumber: number | null = null;

  @Output() onRemoveQuestion = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  removeQuestion() {
    this.onRemoveQuestion.emit(this.questionNumber!);
  }

  get choiceControls(): FormControl[] {
    return (this.formGroup?.get('choices') as FormArray).controls as FormControl[];
  }

}
