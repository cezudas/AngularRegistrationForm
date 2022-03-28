import {Injectable} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {Country} from './models/country';
import {CountryApiService} from './country-api.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private readonly countryApiService: CountryApiService) {}

  public filterByName(filterValue: string): Observable<Country[]> {
    return this.countryApiService
      .fetch()
      .pipe(map(countries => countries.filter(c => c.name.toLowerCase().includes(filterValue.toLowerCase()))));
  }

  public getCountries(): Observable<Country[] | undefined> {
    return this.countryApiService.fetch();
  }

  public getCountry(countryCode: string): Observable<Country | undefined> {
    if (!countryCode) {
      return of(undefined);
    }
    return this.countryApiService.fetch(true).pipe(map(countries => countries.find(c => c.code === countryCode)));
  }
}
