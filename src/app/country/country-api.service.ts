import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, shareReplay, tap} from 'rxjs';
import {environment} from '../../environments/environment';
import {LoadingService} from '../loading.service';
import {Country} from './models/country';

@Injectable({
  providedIn: 'root',
})
export class CountryApiService {
  constructor(private readonly http: HttpClient, private readonly loadingService: LoadingService) {}

  cachedCountries$: Observable<Country[]>;

  public fetch(withSpinnerOverlay = false): Observable<Country[]> {
    if (!this.cachedCountries$) {
      this.loadingService.enableSpinnerOverlay(withSpinnerOverlay);
      this.cachedCountries$ = this.http.get<Country[]>(`${environment.baseApiUrl}/countries`).pipe(
        tap(() => this.loadingService.enableSpinnerOverlay(false)),
        shareReplay(1)
      );
    }
    return this.cachedCountries$;
  }
}
