import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { QuizService } from '../core/services/quiz.service';

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

  constructor(
    private fb: FormBuilder,
    private service: QuizService
    ) { }

  ngOnInit(): void {
    this.addQuestion();
    this.addQuestion();

    this.form.setValue({
      title: 'quiz 1',
      questions: [
        {
          question: 'q1',
          type: 'text',
          choices: ['', '', '', '']
        },
        {
          question: 'q2',
          type: 'choice',
          choices: ['1413', '1231', '564', '1231']
        }
      ]
    });

  }

  submitForm() {
    if (this.form.invalid) {
      return alert('invalid data'); //todo: other dialog component
    }

    const data = this.form.value;
    this.service.createQuiz(data).subscribe();
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
