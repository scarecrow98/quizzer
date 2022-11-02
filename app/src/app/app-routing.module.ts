import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from './core/guards/dashboard.guard';

const routes: Routes = [
  { path: 'auth/login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [ DashboardGuard ]
  },
  {
    path: 'run-quiz',
    loadChildren: () => import('./quiz-runner/quiz-runner.module').then(m => m.QuizRunnerModule),
    canLoad: [ DashboardGuard ]
  },
  {
    path: 'quiz-monitor',
    loadChildren: () => import('./quiz-monitor/quiz-monitor.module').then(m => m.QuizMonitorModule),
    canLoad: [ DashboardGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
