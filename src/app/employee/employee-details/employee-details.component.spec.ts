import {OverlayModule} from '@angular/cdk/overlay';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {DetailItemComponent} from '../../detail-item/detail-item.component';
import {CountriesService} from '../../country/countries.service';
import {EmployeeService} from '../employee.service';
import {Employee} from '../models/employee';

import {EmployeeDetailsComponent} from './employee-details.component';
import {Country} from 'src/app/country/models/country';
import {CountrySelectItemComponent} from '../../country/country-select-item/country-select-item.component';

describe('EmployeeDetailComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;

  const mockCountry: Country = {
    name: 'Romania',
    code: 'RO',
  };

  const mockRouteParams = {
    id: 1,
  };

  const mockEmployee: Employee = {
    email: 'live@healthy.io',
    userName: 'cezudas',
    password: 'Somepassword',
    fullName: '',
    countryCode: mockCountry.code,
    id: mockRouteParams.id,
  };

  const getEmployeeMock = jest.spyOn(EmployeeService.prototype, 'getEmployee').mockReturnValue(of(mockEmployee));
  const getCountryMock = jest.spyOn(CountriesService.prototype, 'getCountry').mockReturnValue(of(mockCountry));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeDetailsComponent, DetailItemComponent, CountrySelectItemComponent],
      providers: [CountriesService, {provider: ActivatedRoute, useValue: {params: of(mockRouteParams)}}],
      imports: [RouterTestingModule, HttpClientTestingModule, OverlayModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch employee details', done => {
    component.employee$.subscribe(empl => {
      expect(empl).toStrictEqual(mockEmployee);
      done();
    });
    expect(getEmployeeMock).toBeCalled();
  });

  it(`should fetch employee's country`, done => {
    component.country$.subscribe(country => {
      expect(country).toStrictEqual(mockCountry);
      done();
    });
    expect(getCountryMock).toBeCalled();
  });
});
