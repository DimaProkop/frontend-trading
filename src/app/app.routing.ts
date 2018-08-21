import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './components/user/user.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: '', component: DashboardComponent}
];

export const routing = RouterModule.forRoot(routes);
