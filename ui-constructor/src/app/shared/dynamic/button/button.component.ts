import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Inject,
  InjectionToken
} from '@angular/core';

abstract class DynamicComponent {
  public static DATA_TOKEN = new InjectionToken<{}>('DYNAMIC_COMPONENT_DATA');
}

@Component({
  selector: 'ucs-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends DynamicComponent implements OnInit {
  @Input() text: string;

  constructor(@Inject(ButtonComponent.DATA_TOKEN) private data) {
    super();
  }

  ngOnInit() {
    this.text = this.data.text;
  }
}
