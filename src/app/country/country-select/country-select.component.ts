import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, HostListener, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {LoadingService} from '../../loading.service';
import {CountriesService} from '../countries.service';
import {Country} from '../models/country';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountrySelectComponent),
      multi: true,
    },
  ],
})
export class CountrySelectComponent implements OnInit, ControlValueAccessor {
  @HostListener('blur')
  onBlur() {
    this.onModelTouched();
  }

  selectedCountry$: Observable<Country | undefined>;
  countries$: Observable<Country[] | undefined>;

  overlayVisible: boolean;

  filterValue: string;

  constructor(
    private readonly countriesService: CountriesService,
    private cd: ChangeDetectorRef,
    private loadingService: LoadingService
  ) {}

  isLoading$ = this.loadingService.isLoading$ as Observable<boolean>;

  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-empty-function
  onModelChange: Function = () => {};

  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-empty-function
  onModelTouched: Function = () => {};

  writeValue(countryCode: string): void {
    this.selectedCountry$ = countryCode ? this.countriesService.getCountry(countryCode) : of(undefined);
    this.cd.markForCheck();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  ngOnInit(): void {
    this.selectedCountry$ = of(undefined);
    this.countries$ = this.countriesService.getCountries();
  }

  clear($event: Event) {
    $event.stopPropagation();
    this.selectedCountry$ = of(undefined);
    this.onModelChange(undefined);
  }

  public onCloseClick($event: Event) {
    $event.stopPropagation();
    this.hide();
  }

  private hide() {
    this.overlayVisible = false;
    // this.cd.markForCheck();
  }

  private show() {
    this.overlayVisible = true;
    // this.cd.markForCheck();
  }

  onMouseClick() {
    if (this.overlayVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  onFilterInputChange(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.countries$ = this.countriesService.filterByName(this.filterValue);
  }

  onCountryClick(country: Country) {
    this.selectedCountry$ = of(country);
    this.onModelChange(country.code);
  }
}
