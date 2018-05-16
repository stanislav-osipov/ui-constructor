import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector,
  InjectionToken,
  ChangeDetectorRef,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { fromEvent, Subject } from 'rxjs';
import { throttleTime, takeUntil } from 'rxjs/operators';

import { ButtonComponent } from '../../shared/dynamic/button/button.component';
import { CardComponent } from '../../shared/dynamic/card/card.component';
import { SchemeService } from '../../core/scheme.service';
import { EventsService } from './events/events.service';

@Component({
  selector: 'ucs-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit, OnDestroy {
  @Input() editable: boolean;
  @Output() drag = new EventEmitter();
  @Output() drop = new EventEmitter();
  @Output() resize = new EventEmitter();

  public scheme: any = {};
  public elements = [];

  private portals: any = {};
  private destroy: Subject<void> = new Subject();

  constructor(
    private injector: Injector,
    private cd: ChangeDetectorRef,
    private schemeService: SchemeService,
    private ref: ElementRef,
    private events: EventsService
  ) {}

  public getPageHeight() {
    return this.scheme.height * this.scheme.density;
  }

  getPortal(element) {
    if (element.id in this.portals) {
      return this.portals[element.id];
    }

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

    const portal = new ComponentPortal(
      component,
      null,
      this.createInjector(element.data, component.DATA_TOKEN)
    );

    this.portals[element.id] = portal;

    return portal;
  }

  private createInjector(data, token): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(token, data);

    return new PortalInjector(this.injector, injectorTokens);
  }

  private setDimensions(element) {
    const position = element.position;

    element.data.width = position.dx / this.scheme.width * 100;
    element.data.height = position.dy * this.scheme.density;

    element.data.x = position.x / this.scheme.width * 100;
    element.data.y = position.y * this.scheme.density;

    element.data.draggable = this.editable;
    element.data.id = element.id;
  }

  ngOnInit() {
    this.schemeService.data.pipe(takeUntil(this.destroy)).subscribe(data => {
      this.scheme = data;
      this.elements = data.elements;
      this.cd.markForCheck();
    });

    if (this.editable) {
      fromEvent(this.ref.nativeElement, 'mousemove')
        .pipe(takeUntil(this.destroy), throttleTime(200))
        .subscribe(event => {
          if (this.events.dragged !== null) {
            this.drag.next({
              index: this.events.dragged,
              event
            });
          }

          if (this.events.resized !== null) {
            this.resize.next({
              index: this.events.resized,
              event
            });
          }
        });

      fromEvent(this.ref.nativeElement, 'mouseup')
        .pipe(takeUntil(this.destroy))
        .subscribe(event => {
          if (this.events.dragged !== null) {
            this.drop.next({
              index: this.events.dragged,
              event
            });
            this.events.dragged = null;
          }

          if (this.events.resized !== null) {
            this.drop.next({
              index: this.events.resized,
              event
            });
            this.events.resized = null;
          }
        });
    }
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
