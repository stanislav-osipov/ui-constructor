import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  Input
} from '@angular/core';

import { DynamicComponent } from '../button/button.component';

@Component({
  selector: 'ucs-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent extends DynamicComponent implements OnInit {
  constructor(@Inject(CardComponent.DATA_TOKEN) public data) {
    super();
  }

  ngOnInit() {}
}
