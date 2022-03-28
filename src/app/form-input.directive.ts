import {Directive, HostBinding, Optional, Self} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[formInput]',
})
export class FormInputDirective {
  constructor(@Optional() @Self() public ngControl: NgControl) {}

  @HostBinding('class.has-validation-error') get hasError() {
    return this.ngControl?.control?.errors;
  }
}
