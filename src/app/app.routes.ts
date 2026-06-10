import { Routes } from '@angular/router';
import { Sms } from './sms/sms';
import { Reporting } from './reporting/reporting';
import { Web } from './web/web';
import { CreateReporting } from './create-reporting/create-reporting';
export const routes: Routes = [
  {
    path: 'sms',
    component: Sms,
  },
  {
    path: 'create-reporting',
    component: CreateReporting,
  },
  {
    path :'reporting',
    component: Reporting,
  },
  {
    path :'web',
    component: Web,
  },
  {
    path: '',
    redirectTo: 'sms',
    pathMatch: 'full',
  },
];