import { Routes } from '@angular/router';
import { ROUTE_HOME_RELATIVE, ROUTE_LOGIN_RELATIVE, ROUTE_CREATE_RELATIVE, ROUTE_FORGOT_RELATIVE, ROUTE_EDIT_RELATIVE} from "./shared/routing-paths";
import {AuthGuard} from "./guards/auth.guard";


export const routes: Routes = [
  {
    path: ROUTE_HOME_RELATIVE,
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: ROUTE_LOGIN_RELATIVE,
    pathMatch: 'full',
  },
  {
    path: ROUTE_LOGIN_RELATIVE,
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: ROUTE_CREATE_RELATIVE,
    loadComponent: () => import('./pages/create-account/create-account.page').then(m => m.CreateAccountPage)
  },
  {
    path: ROUTE_FORGOT_RELATIVE,
    loadComponent: () => import('./pages/forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage)
  },
  {
    path: ROUTE_EDIT_RELATIVE,
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/movie-detail/movie-detail.page').then(m => m.MovieDetailPage)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.page').then(m => m.NotFoundPage)
  }
];
