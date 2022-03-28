import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CountrySelectItemComponent} from './country-select-item.component';

describe('CountrySelectItemComponent', () => {
  let component: CountrySelectItemComponent;
  let fixture: ComponentFixture<CountrySelectItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountrySelectItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrySelectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set css class on host element', () => {
    expect(fixture.debugElement.classes).toMatchObject({selectable: true});
  });

  it('should not set css class on host element', () => {
    component.selectable = false;
    fixture.detectChanges();
    expect(fixture.debugElement.classes).not.toMatchObject({selectable: true});
  });
});
