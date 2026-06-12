import { Routes } from '@angular/router';
import { Sms } from './sms/sms';
import { Reporting } from './reporting/reporting';
import { Web } from './web/web';
import { CreateReporting } from './create-reporting/create-reporting';
import { Login } from './login/login';
import { authGuard } from './core/guards/auth.guard';
import { Login2 } from './login2/login2';
import { Login3 } from './login3/login3';
import { Login4 } from './login4/login4';
import { Login5 } from './login5/login5';
import { Login6 } from './login6/login6';
import { Mbank } from './mbank/mbank';
import { BharatBank } from './bharat-bank/bharat-bank';
import { Jodetx } from './jodetx/jodetx';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'login4',
    component: Login4,
  },
  {
    path: 'login5',
    component: Login5,
  },
  {
    path: 'mbank',
    component: Mbank,
  },
  {
    path: 'bharat',
    component: BharatBank,
  },
  {
    path: 'jodetx',
    component: Jodetx,
  },
  {
    path: 'login6',
    component: Login6,
  },
  {
    path: 'login2',
    component: Login2,
  },
  {
    path: 'login3',
    component: Login3,
  },
  {
    path: 'sms',
    component: Sms,
    canActivate: [authGuard],
  },
  {
    path: 'create-reporting',
    component: CreateReporting,
    canActivate: [authGuard],
  },
  {
    path: 'reporting',
    component: Reporting,
    canActivate: [authGuard],
  },
  {
    path: 'web',
    component: Web,
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];