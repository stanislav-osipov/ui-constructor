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
import { SchemeService } from '../../core/scheme.service';

@Component({
  selector: 'ucs-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit {
  public scheme: any = {};

  constructor(
    private injector: Injector,
    private cd: ChangeDetectorRef,
    private schemeService: SchemeService
  ) {}

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

  ngOnInit() {
    this.schemeService.data.subscribe(data => {
      this.scheme = data;
      this.cd.detectChanges();
    });
  }
}
