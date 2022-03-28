import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {Country} from '../models/country';

@Component({
  selector: 'app-country-select-item',
  templateUrl: './country-select-item.component.html',
  styleUrls: ['./country-select-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySelectItemComponent {
  @Input() country: Country;

  @HostBinding('class.selectable')
  @Input()
  selectable = true;
}
