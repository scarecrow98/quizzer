import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQuizComponent } from './create-quiz.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateQuizComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CreateQuizComponent }
    ]),
    ReactiveFormsModule
  ]
})
export class CreateQuizModule { }
