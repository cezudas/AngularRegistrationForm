import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable, switchMap} from 'rxjs';
import {CountriesService} from '../../country/countries.service';
import {Country} from '../../country/models/country';
import {LoadingService} from '../../loading.service';
import {EmployeeService} from '../employee.service';
import {Employee} from '../models/employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {
  employee$!: Observable<Employee>;
  isLoading$ = this.loadingService.isLoading$;
  country$!: Observable<Country | undefined>;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private readonly countryService: CountriesService,
    public readonly loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.employee$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.employeeService.getEmployee(params.get('id') || ''))
    );

    this.country$ = this.employee$.pipe(switchMap(emp => this.countryService.getCountry(emp.countryCode)));
  }
}
