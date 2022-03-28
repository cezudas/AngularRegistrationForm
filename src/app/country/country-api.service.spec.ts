import {OverlayModule} from '@angular/cdk/overlay';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {environment} from '../../environments/environment';
import {LoadingService} from '../loading.service';

import {CountryApiService} from './country-api.service';
import {of} from 'rxjs';

describe('CountryApiService', () => {
  let service: CountryApiService;

  const httpGetMock = jest.spyOn(HttpClient.prototype, 'get').mockReturnValue(of([]));
  const fetchUrl = `${environment.baseApiUrl}/countries`;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [OverlayModule, HttpClientTestingModule]});
    service = TestBed.inject(CountryApiService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the countries fetch API endpoint', () => {
    service.fetch();
    expect(httpGetMock).toBeCalledWith(fetchUrl);
  });

  it('should not enable overlay spinner', done => {
    const enableSpinnerMock = jest.spyOn(LoadingService.prototype, 'enableSpinnerOverlay');

    service.fetch(true).subscribe(() => {
      expect(enableSpinnerMock).toBeCalledTimes(2);
      expect(enableSpinnerMock).toBeCalledWith(false);
      expect(enableSpinnerMock).toBeCalledWith(true);
      expect(enableSpinnerMock).lastCalledWith(false);
      done();
    });
  });

  it('should enable overlay spinner', done => {
    const enableSpinnerMock = jest.spyOn(LoadingService.prototype, 'enableSpinnerOverlay');

    service.fetch(true).subscribe(() => {
      expect(enableSpinnerMock).toBeCalledTimes(2);
      expect(enableSpinnerMock).toBeCalledWith(false);
      expect(enableSpinnerMock).toBeCalledWith(true);
      expect(enableSpinnerMock).lastCalledWith(false);
      done();
    });
  });
});
