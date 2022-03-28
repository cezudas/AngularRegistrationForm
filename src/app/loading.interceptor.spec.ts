import {OverlayModule} from '@angular/cdk/overlay';
import {HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';
import {Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs';

import {LoadingInterceptor} from './loading.interceptor';
import {LoadingService} from './loading.service';

@Injectable()
export class TestDataService {
  constructor(private readonly http: HttpClient) {}
  public getObject(): Observable<unknown> {
    return this.http.get('bla');
  }
}

describe('LoadingInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  const callOrder: string[] = [];
  const mockloadingIncrement = jest
    .spyOn(LoadingService.prototype, 'incrementRequestCount')
    .mockImplementation(() => callOrder.push('increment'));
  const mockLoadingDecrement = jest
    .spyOn(LoadingService.prototype, 'decrementRequestCount')
    .mockImplementation(() => callOrder.push('decrement'));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingInterceptor,
          multi: true,
        },
        TestDataService,
        LoadingService,
      ],
      imports: [HttpClientTestingModule, OverlayModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('increment increment request count once followed byt decrement request count once', () => {
    httpClient.get('url', {responseType: 'text'}).subscribe();

    const httpRequest = httpMock.expectOne('url');
    httpRequest.flush({
      status: 200,
      statusText: '',
    });

    httpMock.verify();

    expect(mockloadingIncrement).toBeCalledTimes(1);
    expect(mockLoadingDecrement).toBeCalledTimes(1);
    expect(callOrder).toEqual(['increment', 'decrement']);
  });
});
