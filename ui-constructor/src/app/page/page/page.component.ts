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
import { CardComponent } from '../../shared/dynamic/card/card.component';

const scheme = {
  elements: [
    {
      position: { x: 5, dx: 7, y: 0, dy: 2 },
      type: 'Button',
      data: {
        text: 'Click me!'
      }
    },
    {
      position: { x: 0, dx: 1, y: 6, dy: 8 },
      type: 'Button',
      data: {
        text: 'Click me 2!'
      }
    },
    {
      position: { x: 0, dx: 1, y: 0, dy: 3 },
      type: 'Button',
      data: {
        text: 'Click me 3!'
      }
    },
    {
      position: { x: 1, dx: 4, y: 1, dy: 11 },
      type: 'Card',
      data: {
        title: 'Title 1',
        subtitle: 'Subtitle 1',
        content: 'content content content content content content',
        button: 'Ok'
      }
    },
    {
      position: { x: 6, dx: 10, y: 2, dy: 10 },
      type: 'Card',
      data: {
        title: 'Title 2',
        subtitle: 'Subtitle 2',
        content: 'content content content content content content',
        button: 'Ok'
      }
    }
  ],
  width: 10,
  height: 20,
  density: 20,
  padding: 5
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

  public getPageHeight() {
    return this.scheme.height * this.scheme.density;
  }

  getPortal(element) {
    let component;

    switch (element.type) {
      case 'Button':
        component = ButtonComponent;
        break;

      case 'Card':
        component = CardComponent;
        break;
    }

    this.setDimensions(element);

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

  private setDimensions(element) {
    const position = element.position;

    element.data.width = (position.dx - position.x) / this.scheme.width * 100;
    element.data.height = (position.dy - position.y) * this.scheme.density;

    element.data.x = position.x / this.scheme.width * 100;
    element.data.y = position.y * this.scheme.density;
  }

  ngOnInit() {}
}
