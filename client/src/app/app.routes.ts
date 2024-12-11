import { Routes } from '@angular/router';
import {RegisterComponent} from './features/register/register.component';
import {LoginComponent} from './features/login/login.component';
import {DocumentComponent} from './features/document/document.component';
import {AuthGuard} from './core/auth.guard';
import {HomeComponent} from './features/home/home.component';

export const routes: Routes = [
    {
      path: 'register',
      component: RegisterComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'document/:id',
    component: DocumentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
