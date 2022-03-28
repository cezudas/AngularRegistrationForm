import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailItemComponent {
  @Input() heading: string;
  @Input() value?: string;
  @Input() emptyPlaceholder = true;
}
