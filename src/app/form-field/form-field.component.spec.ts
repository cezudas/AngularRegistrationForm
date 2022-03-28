import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {RegExpContants} from '../../RegExpConstants';
import {FormInputDirective} from '../form-input.directive';

import {FormFieldComponent} from './form-field.component';

@Component({
  template: `
    <form [formGroup]="form">
      <app-form-field [patternErrorHint]="'Pattern error'">
        <input formInput formControlName="control" />
      </app-form-field>
    </form>
  `,
})
class TestComponent {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    control: ['', [(c: AbstractControl) => Validators.required(c), Validators.pattern(RegExpContants.emailPattern)]],
  });
}

describe('FormFieldComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let validationHint: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, FormInputDirective, FormFieldComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    validationHint = fixture.debugElement.query(By.css('.field-error-hint'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render required validation hint', () => {
    expect(validationHint.classes).toMatchObject({'hint-required': true});
  });

  it('should render pattern validation hint', () => {
    component.form.controls['control'].setValue('invalid@email');
    fixture.detectChanges();
    validationHint = fixture.debugElement.query(By.css('.field-error-hint'));
    expect(validationHint.classes).toMatchObject({'hint-pattern': true});
  });
});
