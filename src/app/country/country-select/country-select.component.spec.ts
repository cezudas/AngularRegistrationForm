import {OverlayModule} from '@angular/cdk/overlay';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {LoadingService} from '../../loading.service';
import {CountryApiService} from '../country-api.service';
import {CountrySelectItemComponent} from '../country-select-item/country-select-item.component';

import {CountrySelectComponent} from './country-select.component';

describe('CountrySelectComponent', () => {
  let component: CountrySelectComponent;
  let fixture: ComponentFixture<CountrySelectComponent>;

  const countriesFetchMock = jest.spyOn(CountryApiService.prototype, 'fetch').mockImplementation(() => {
    return of([{name: '', code: ''}]);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayModule, HttpClientTestingModule],
      declarations: [CountrySelectComponent, CountrySelectItemComponent],
      providers: [LoadingService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch countries', () => {
    expect(countriesFetchMock).toHaveBeenCalled();
  });
});
