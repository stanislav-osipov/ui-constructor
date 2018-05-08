import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector,
  InjectionToken,
  ChangeDetectorRef
} from '@angular/core';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { ButtonComponent } from '../../shared/dynamic/button/button.component';

const scheme = {
  elements: [
    {
      position: { x: 0, dx: 6, y: 0, dy: 10 },
      type: 'Button',
      data: {
        text: 'Click me!'
      }
    },
    {
      position: { x: 0, dx: 6, y: 0, dy: 10 },
      type: 'Button',
      data: {
        text: 'Click me 2!'
      }
    },
    {
      position: { x: 0, dx: 6, y: 0, dy: 10 },
      type: 'Button',
      data: {
        text: 'Click me 3!'
      }
    }
  ],
  width: 10,
  height: 10
};

@Component({
  selector: 'ucs-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit {
  public scheme = scheme;

  constructor(private injector: Injector, private cd: ChangeDetectorRef) {}

  getPortal(element) {
    let component;

    switch (element.type) {
      case 'Button':
        component = ButtonComponent;
    }

    return new ComponentPortal(
      component,
      null,
      this.createInjector(element.data, component.DATA_TOKEN)
    );
  }

  private createInjector(data, token): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(token, data);

    return new PortalInjector(this.injector, injectorTokens);
  }

  ngOnInit() {}
}
