import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: 'create-quiz',
            loadChildren: () => import('../create-quiz/create-quiz.module').then(m => m.CreateQuizModule),
            data: {
              title: 'Create your quiz'
            }
          }
        ]
      }
    ])
  ]
})
export class DashboardModule { }
