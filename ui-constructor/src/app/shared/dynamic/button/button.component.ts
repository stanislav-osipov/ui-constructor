import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Inject,
  InjectionToken
} from '@angular/core';

export abstract class DynamicComponent {
  public static DATA_TOKEN = new InjectionToken<{}>('DYNAMIC_COMPONENT_DATA');

  @Input() width: string;
  @Input() height: string;
}

@Component({
  selector: 'ucs-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends DynamicComponent implements OnInit {
  @Input() text: string;

  constructor(@Inject(ButtonComponent.DATA_TOKEN) public data) {
    super();
  }

  ngOnInit() {
    this.text = this.data.text;
    this.height = this.data.height;
    this.width = this.data.width;
  }
}
