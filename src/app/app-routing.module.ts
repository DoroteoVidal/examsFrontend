import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewExamsComponent } from './pages/admin/view-exams/view-exams.component';
import { AddExamComponent } from './pages/admin/add-exam/add-exam.component';
import { UpdateExamComponent } from './pages/admin/update-exam/update-exam.component';
import { ViewExamQuestionsComponent } from './pages/admin/view-exam-questions/view-exam-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';

const routes: Routes = [
  {
    path : '',
    component : HomeComponent,
    pathMatch : 'full'
  },
  {
    path : 'signup',
    component : SignupComponent,
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent,
    pathMatch : 'full'
  },
  {
    path : 'admin',
    component : DashboardComponent,
    canActivate : [AdminGuard],
    children : [
      {
        path : 'profile',
        component : ProfileComponent
      },
      {
        path : '',
        component : WelcomeComponent
      },
      {
        path : 'categories',
        component : ViewCategoriesComponent
      },
      {
        path : 'add-category',
        component : AddCategoryComponent
      },
      {
        path : 'exams',
        component : ViewExamsComponent
      },
      {
        path : 'add-exam',
        component : AddExamComponent
      },
      {
        path : 'exams/:id',
        component : UpdateExamComponent
      },
      {
        path : 'view-questions/exam/:id/:title',
        component : ViewExamQuestionsComponent
      },
      {
        path : 'add-question/exam/:id/:title',
        component : AddQuestionComponent
      },
      {
        path : 'questions/:id',
        component : UpdateQuestionComponent
      }
    ]
  },
  {
    path : 'user-dashboard',
    component : UserDashboardComponent,
    pathMatch : 'full',
    canActivate : [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
