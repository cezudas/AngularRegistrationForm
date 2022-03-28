import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {LoadingService} from './loading.service';
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(public readonly loadingService: LoadingService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.incrementRequestCount();
    return next.handle(req).pipe(finalize(() => this.loadingService.decrementRequestCount()));
  }
}
