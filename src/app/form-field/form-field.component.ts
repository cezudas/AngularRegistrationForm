import {Component, ContentChild, Input, OnInit} from '@angular/core';
import {FormInputDirective} from '../form-input.directive';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent implements OnInit {
  @ContentChild(FormInputDirective, {static: true})
  formInputDirective!: FormInputDirective;

  @Input()
  patternErrorHint = '';

  get errors() {
    return this.formInputDirective?.ngControl?.control?.errors;
  }

  ngOnInit() {
    if (!this.formInputDirective) {
      throw new Error('FormInputDirective is required!');
    }
  }
}
