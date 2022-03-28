import {Component, OnDestroy} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {RegExpContants} from '../../RegExpConstants';
import {EmployeeService} from '../employee/employee.service';
import {Employee} from '../employee/models/employee';
import {LoadingService} from '../loading.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnDestroy {
  private readonly _stopSubscriptions$ = new Subject<void>();

  isLoading$ = this.loadingService.isLoading$;

  registrationForm = this.fb.group({
    email: ['', [(c: AbstractControl) => Validators.required(c), Validators.pattern(RegExpContants.emailPattern)]],
    userName: [
      '',
      [
        (c: AbstractControl) => Validators.required(c),
        Validators.pattern(RegExpContants.eightMinAlphaNumericalCharsPattern),
      ],
    ],
    password: [
      '',
      [(c: AbstractControl) => Validators.required(c), Validators.pattern(RegExpContants.eightMinCharsPattern)],
    ],
    fullName: [''],
    countryCode: ['', [(c: AbstractControl) => Validators.required(c)]],
  });

  message: {[key: string]: string} = {};

  constructor(
    private fb: FormBuilder,
    private readonly employeeService: EmployeeService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  get email(): AbstractControl {
    return this.registrationForm.controls['email'];
  }

  get userName(): AbstractControl {
    return this.registrationForm.controls['userName'];
  }

  get password(): AbstractControl {
    return this.registrationForm.controls['password'];
  }

  get fullName(): AbstractControl {
    return this.registrationForm.controls['fullName'];
  }

  get countryCode(): AbstractControl {
    return this.registrationForm.controls['countryCode'];
  }

  onSubmit() {
    this.employeeService
      .register(this.registrationForm.value)
      .pipe(takeUntil(this._stopSubscriptions$))
      .subscribe((employee: Employee) => {
        this.router.navigate([`employee/${employee.id}`]);
      });
  }

  onReset() {
    this.registrationForm.reset();
  }

  ngOnDestroy(): void {
    this._stopSubscriptions$.next();
    this._stopSubscriptions$.complete();
  }
}
