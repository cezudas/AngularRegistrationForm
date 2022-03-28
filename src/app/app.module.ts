import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserRegistrationComponent} from './user-registration/user-registration.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {CountrySelectComponent} from './country/country-select/country-select.component';
import {LoadingInterceptor} from './loading.interceptor';
import {SpinnerComponent} from './spinner/spinner.component';
import {SpinnerOverlayComponent} from './spinner-overlay/spinner-overlay.component';
import {EmployeeDetailsComponent} from './employee/employee-details/employee-details.component';
import {CountrySelectItemComponent} from './country/country-select-item/country-select-item.component';
import {DetailItemComponent} from './detail-item/detail-item.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {FormFieldComponent} from './form-field/form-field.component';
import {FormInputDirective} from './form-input.directive';

@NgModule({
  entryComponents: [SpinnerOverlayComponent],
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    CountrySelectComponent,
    CountrySelectItemComponent,
    EmployeeDetailsComponent,
    SpinnerComponent,
    SpinnerOverlayComponent,
    DetailItemComponent,
    FormFieldComponent,
    FormInputDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollingModule,
    OverlayModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
