import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
  Inject,
  HostListener,
  AfterContentInit
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { SchemeService } from '../../core/scheme.service';
import { EventsService } from '../../page/page/events/events.service';

@Component({
  selector: 'ucs-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConstructorComponent implements OnInit, AfterContentInit {
  @ViewChild('page') private container;

  public dragged = null;
  public scheme: any = {};
  public grids = {
    vertical: [],
    horizontal: []
  };

  constructor(
    private schemeService: SchemeService,
    private cd: ChangeDetectorRef,
    private events: EventsService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.schemeService.data.subscribe(data => (this.scheme = data));
    this.computeVerticalGrid();
    this.computeHorizontalGrid();
  }

  ngAfterContentInit() {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
    this.schemeService.alignGridWidth(this.container.nativeElement.clientWidth);
    this.computeVerticalGrid();
  }

  private computeVerticalGrid() {
    const result = [];

    for (let i = 1; i < this.scheme.width; i++) {
      result.push({
        left: this.getLeftOffset(i)
      });
    }

    this.grids.vertical = result;
  }

  private computeHorizontalGrid() {
    for (let i = 1; i < this.scheme.height; i++) {
      this.grids.horizontal.push({
        top: this.getTopOffset(i)
      });
    }
  }

  private getTopOffset(i) {
    return i * this.scheme.density;
  }

  private getLeftOffset(i) {
    return i * (100 / this.scheme.width);
  }

  public getPageHeight() {
    return this.scheme.height * this.scheme.density;
  }

  public onDragStart(name) {
    this.dragged = name;
  }

  public onDrop(e) {
    if (this.dragged) {
      this.insertElement(e.clientX, e.clientY, this.dragged);
      this.dragged = null;
    }
  }

  public onOver(e) {
    return false;
  }

  private offset(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const scrollLeft =
      window.pageXOffset || this.document.documentElement.scrollLeft;
    const scrollTop =
      window.pageYOffset || this.document.documentElement.scrollTop;

    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  }

  private convertToGrid(x, y) {
    const element = this.container.nativeElement;
    const pageSize = element.clientWidth;
    const pageOffset = this.offset(element);

    return {
      x: Math.floor((x - pageOffset.left) * this.scheme.width / pageSize),
      y: Math.floor((y - pageOffset.top) / this.scheme.density)
    };
  }

  // TODO Refactor dynamic component insertion
  private insertElement(x, y, name) {
    const insertTo = this.convertToGrid(x, y);

    this.scheme.elements.push({
      id: this.scheme.elements.length,
      position: {
        x: insertTo.x,
        dx: 2,
        y: insertTo.y,
        dy: 2
      },
      type: 'Button',
      data: {
        text: 'Click me!'
      }
    });

    this.schemeService.change(this.scheme);
    this.setDimensions(this.scheme.elements[this.scheme.elements.length - 1]);
    this.events.changed.next(
      this.scheme.elements[this.scheme.elements.length - 1]
    );
  }

  private setDimensions(element) {
    const position = element.position;

    element.data.width = position.dx / this.scheme.width * 100;
    element.data.height = position.dy * this.scheme.density;

    element.data.x = position.x / this.scheme.width * 100;
    element.data.y = position.y * this.scheme.density;

    element.data.id = element.id;
  }

  public editDrag({ index, event }) {
    const gridPoint = this.convertToGrid(event.clientX, event.clientY);
    const target = this.scheme.elements[index];

    target.data.drag = true;
    target.position.x = gridPoint.x;
    target.position.y = gridPoint.y;

    this.setDimensions(target);

    this.events.changed.next(target);
  }

  public editDrop({ index, event }) {
    const target = this.scheme.elements[index];

    if (target) {
      target.data.drag = false;
      this.events.changed.next(target);
    }
  }

  public editResize({ index, event }) {
    const gridPoint = this.convertToGrid(event.clientX, event.clientY);
    const target = this.scheme.elements[index];

    target.data.drag = true;
    target.position.dx = gridPoint.x - target.position.x + 1;
    target.position.dy = gridPoint.y - target.position.y + 1;

    this.setDimensions(target);

    this.events.changed.next(target);
  }
}
