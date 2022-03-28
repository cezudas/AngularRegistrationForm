import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeDetailsComponent} from './employee/employee-details/employee-details.component';
import {UserRegistrationComponent} from './user-registration/user-registration.component';

const routes: Routes = [
  {path: '', redirectTo: 'register', pathMatch: 'full'},
  {
    path: 'register',
    component: UserRegistrationComponent,
  },
  {
    path: 'employee/:id',
    component: EmployeeDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
