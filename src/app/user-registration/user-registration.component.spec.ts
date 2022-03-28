import {OverlayModule} from '@angular/cdk/overlay';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {CountryApiService} from '../country/country-api.service';
import {CountrySelectComponent} from '../country/country-select/country-select.component';
import {FormFieldComponent} from '../form-field/form-field.component';
import {FormInputDirective} from '../form-input.directive';
import {LoadingService} from '../loading.service';

import {UserRegistrationComponent} from './user-registration.component';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;

  jest.spyOn(CountryApiService.prototype, 'fetch').mockImplementation(() => {
    return of([{name: '', code: ''}]);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRegistrationComponent, FormFieldComponent, FormInputDirective, CountrySelectComponent],
      imports: [ReactiveFormsModule, OverlayModule, RouterTestingModule, HttpClientTestingModule],
      providers: [LoadingService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
