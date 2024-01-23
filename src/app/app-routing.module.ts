import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { authGuard } from './shared/auth.guard';

const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'userlist', canActivate : [authGuard], component : UserlistComponent},
  {path : 'home', component : HomeComponent},
  {path : 'error', component : ErrorComponent},
  {path : '**', redirectTo : 'error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
