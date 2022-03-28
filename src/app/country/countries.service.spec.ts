import {OverlayModule} from '@angular/cdk/overlay';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import countries from '../../test/countries';

import {CountriesService} from './countries.service';
import {CountryApiService} from './country-api.service';

describe('CountriesService', () => {
  let service: CountriesService;

  const countriesFetchMock = jest.spyOn(CountryApiService.prototype, 'fetch').mockImplementation(() => {
    return of(countries);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule, HttpClientTestingModule],
    });
    service = TestBed.inject(CountriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get call API service', () => {
    service.getCountries();
    expect(countriesFetchMock).toHaveBeenCalled();
  });

  it('should filter by name', done => {
    service.filterByName('Turk').subscribe(value => {
      expect(value).toStrictEqual([
        {
          name: 'Turkey',
          code: 'TR',
        },
        {
          name: 'Turkmenistan',
          code: 'TM',
        },
        {
          name: 'Turks and Caicos Islands',
          code: 'TC',
        },
      ]);
      done();
    });
    expect(countriesFetchMock).toHaveBeenCalled();
  });

  it('should find country by code', done => {
    service.getCountry('RO').subscribe(value => {
      expect(value).toStrictEqual({
        name: 'Romania',
        code: 'RO',
      });
      done();
    });
    expect(countriesFetchMock).toHaveBeenCalled();
  });
});
