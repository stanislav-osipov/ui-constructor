import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SchemeService } from '../../core/scheme.service';

@Component({
  selector: 'ucs-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConstructorComponent implements OnInit {
  @ViewChild('page') private container;

  public dragged = null;
  public scheme: any = {};

  constructor(private schemeService: SchemeService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.schemeService.data.subscribe(data => (this.scheme = data));
  }

  public computeVerticalGrid() {
    const grid = [];

    for (let i = 1; i < this.scheme.width; i++) {
      grid.push({
        left: this.getLeftOffset(i)
      });
    }

    return grid;
  }

  public computeHorizontalGrid() {
    const grid = [];

    for (let i = 1; i < this.scheme.height; i++) {
      grid.push({
        top: this.getTopOffset(i)
      });
    }

    return grid;
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
    this.insertElement(e.layerX, e.layerY, this.dragged);
    this.dragged = null;
  }

  public onOver(e) {
    return false;
  }

  private insertElement(x, y, name) {
    const pageSize = this.container.nativeElement.clientWidth;

    const insertTo = {
      x: Math.floor(x * this.scheme.width / pageSize),
      y: Math.floor(y / this.scheme.density)
    };

    this.scheme.elements.push({
      position: { x: insertTo.x, dx: insertTo.x + 2, y: insertTo.y, dy: insertTo.y + 2 },
      type: 'Button',
      data: {
        text: 'Click me!'
      }
    });

    this.schemeService.change(this.scheme);
    //this.cd.detectChanges();
    console.log(insertTo.x, insertTo.y, name);
  }
}
