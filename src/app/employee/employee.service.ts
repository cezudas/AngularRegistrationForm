import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Employee} from './models/employee';
import {environment} from '../../environments/environment';
import {LoadingService} from '../loading.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private readonly http: HttpClient, private readonly loadingService: LoadingService) {}

  register(employee: Employee): Observable<Employee> {
    this.loadingService.enableSpinnerOverlay(false);
    return this.http
      .post<Employee>(`${environment.baseApiUrl}/employees`, employee)
      .pipe(tap(() => this.loadingService.enableSpinnerOverlay(true)));
  }

  getEmployee(id: string) {
    return this.http.get<Employee>(`${environment.baseApiUrl}/employees/${id}`);
  }
}
