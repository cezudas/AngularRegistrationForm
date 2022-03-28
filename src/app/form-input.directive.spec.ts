import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {FormInputDirective} from './form-input.directive';

@Component({
  template: `
    <form [formGroup]="form">
      <input formInput formControlName="control" />
    </form>
  `,
})
class TestComponent {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    control: ['', [(c: AbstractControl) => Validators.required(c)]],
  });
}

describe('FormInputDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, FormInputDirective],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    des = fixture.debugElement.query(By.directive(FormInputDirective));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render error CSS class', () => {
    expect(des.classes).toMatchObject({'has-validation-error': true});
  });

  it('should render NO error CSS class', () => {
    component.form.controls['control'].setValue('some value');
    fixture.detectChanges();
    expect(des.classes).not.toMatchObject({'has-validation-error': true});
  });
});
