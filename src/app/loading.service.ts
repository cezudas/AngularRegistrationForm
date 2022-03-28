import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SpinnerOverlayService} from './spinner-overlay/spinner-overlay.service';
@Injectable({providedIn: 'root'})
export class LoadingService {
  isLoading$ = new BehaviorSubject<boolean>(false);

  private _isSpinnerOverlayEnabled = true;

  public enableSpinnerOverlay(isSpinnerOverlayEnabled: boolean) {
    this._isSpinnerOverlayEnabled = isSpinnerOverlayEnabled;
    if (!isSpinnerOverlayEnabled) {
      this.spinnerOverlayService.hide();
    }
  }

  constructor(private readonly spinnerOverlayService: SpinnerOverlayService) {}

  pendingRequestsCount = 0;
  incrementRequestCount() {
    if (this.pendingRequestsCount === 0) {
      this.show();
    }
    this.pendingRequestsCount++;
  }

  decrementRequestCount() {
    if (this.pendingRequestsCount === 0) {
      return;
    }

    this.pendingRequestsCount--;
    if (this.pendingRequestsCount === 0) {
      this.hide();
    }
  }

  private show() {
    this.isLoading$.next(true);
    if (this._isSpinnerOverlayEnabled) {
      this.spinnerOverlayService.show();
    }
  }

  private hide() {
    this.isLoading$.next(false);
    this.spinnerOverlayService.hide();
  }
}
