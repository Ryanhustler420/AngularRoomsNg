import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate:[AuthGuard] },
    {path: 'register', component: RegisterComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
RouterModule.forChild(routes),
    FormsModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,AuthGuard]
})

export class AuthModule { }
