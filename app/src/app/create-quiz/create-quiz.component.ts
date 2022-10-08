import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss'],  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateQuizComponent implements OnInit {

  form = this.fb.group({
    title: [ '', Validators.required ],
    questions: this.fb.array([])
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addQuestion();

  }

  submitForm() {
    console.log(this.form.value);
  }

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  addQuestion(): void {
    this.questions.push(this.fb.group({
      question: ['', Validators.required],
      type: ['text', Validators.required],
      choices: this.fb.array(['', '', '', ''])
    }));

  }

}
