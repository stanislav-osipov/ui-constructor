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
  @Input() title: string;
  @Input() subtitle: string;
  @Input() content: string;
  @Input() button: string;

  constructor(@Inject(CardComponent.DATA_TOKEN) public data) {
    super();
  }

  ngOnInit() {
    this.title = this.data.title;
    this.subtitle = this.data.subtitle;
    this.content = this.data.content;
    this.button = this.data.button;
    this.width = this.data.width;
    this.height = this.data.height;
  }
}
