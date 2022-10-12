import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {

  @Input() form: FormGroup | null = null;

  constructor() { }

  ngOnInit(): void {

  }

  get questions(): FormArray {
    return (this.form!.get('questions') as FormArray);
  }

  get questionsControls(): FormGroup[] {
    return this.questions.controls as FormGroup[];
  }

}
