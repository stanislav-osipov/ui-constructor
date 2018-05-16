import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Inject,
  InjectionToken,
  ChangeDetectorRef
} from '@angular/core';

export abstract class DynamicComponent {
  public static DATA_TOKEN = new InjectionToken<{}>('DYNAMIC_COMPONENT_DATA');

  public edit = false;

  editChanged(value) {
    this.edit = value;
  }
}

@Component({
  selector: 'ucs-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends DynamicComponent implements OnInit {
  @Input() text: string;

  constructor(@Inject(ButtonComponent.DATA_TOKEN) public data, private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {}

  save(text) {
    this.data.text = text;
  }
}
