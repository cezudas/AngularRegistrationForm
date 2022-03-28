import {OverlayModule} from '@angular/cdk/overlay';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SpinnerComponent} from '../spinner/spinner.component';

import {SpinnerOverlayComponent} from './spinner-overlay.component';

describe('SpinnerOverlayComponent', () => {
  let component: SpinnerOverlayComponent;
  let fixture: ComponentFixture<SpinnerOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerOverlayComponent, SpinnerComponent],
      imports: [OverlayModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render spinner while not loading', () => {
    component.loadingService.isLoading$.next(false);
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('app-spinner'));
    expect(spinner).toBeFalsy();
  });

  it('should render spinner while loading', () => {
    component.loadingService.isLoading$.next(true);
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('app-spinner'));
    expect(spinner).toBeTruthy();
  });
});
