import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EmployeeService} from './employee.service';
import {HttpClient} from '@angular/common/http';
import {OverlayModule} from '@angular/cdk/overlay';
import {of} from 'rxjs';
import {environment} from '../../environments/environment';
import {Employee} from './models/employee';

describe('EmployeeService', () => {
  let service: EmployeeService;

  const httpGetMock = jest.spyOn(HttpClient.prototype, 'get').mockReturnValue(of({}));
  const employeesUrl = `${environment.baseApiUrl}/employees`;

  const mockEmployee: Employee = {
    email: 'live@healthy.io',
    userName: 'cezudas',
    password: 'Somepassword',
    fullName: '',
    countryCode: 'RO',
    id: 1,
  };
  const httpPostMock = jest.spyOn(HttpClient.prototype, 'post').mockReturnValue(of({mockEmployee}));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule, HttpClientTestingModule],
    });
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call user get detail API endpoint', () => {
    const id = '1';
    service.getEmployee(id);
    expect(httpGetMock).toBeCalledWith(`${employeesUrl}/${id}`);
  });

  it('should call user register API endpoint', () => {
    service.register(mockEmployee);
    expect(httpPostMock).toBeCalledWith(employeesUrl, mockEmployee);
  });
});
