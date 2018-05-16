import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventsService } from '../page/page/events/events.service';

// TODO Refine data model
const scheme = {
  elements: [
    {
      id: 0,
      position: { x: 5, dx: 8, y: 0, dy: 2 },
      type: 'Button',
      data: {
        text: 'Click me!',
        background: '#fff',
        color: '#000'
      }
    },
    {
      id: 1,
      position: { x: 0, dx: 8, y: 6, dy: 2 },
      type: 'Button',
      data: {
        text: 'Click me 2!',
        background: '#fff',
        color: '#000'
      }
    },
    {
      id: 2,
      position: { x: 10, dx: 14, y: 1, dy: 10 },
      type: 'Card',
      data: {
        title: 'Title 1',
        subtitle: 'Subtitle 1',
        content: 'content content content content content content',
        button: 'Ok',
        background: '#fff'
      }
    },
    {
      id: 3,
      position: { x: 16, dx: 14, y: 2, dy: 8 },
      type: 'Card',
      data: {
        title: 'Title 2',
        subtitle: 'Subtitle 2',
        content: 'content content content content content content',
        button: 'Ok',
        background: '#fff'
      }
    },
    {
      id: 4,
      position: { x: 0, dx: 8, y: 0, dy: 3 },
      type: 'Button',
      data: {
        text: 'Click me 3!',
        background: '#fff',
        color: '#000'
      }
    }
  ],
  width: 36,
  height: 20,
  density: 20
};

@Injectable({
  providedIn: 'root'
})
export class SchemeService {
  public data = new BehaviorSubject(scheme);
  private scheme = scheme;

  constructor(private events: EventsService) {}

  public change(value) {
    this.scheme = value;
    this.data.next(value);
  }

  private setDimensions(element) {
    const position = element.position;

    element.data.width = position.dx / this.scheme.width * 100;
    element.data.height = position.dy * this.scheme.density;

    element.data.x = position.x / this.scheme.width * 100;
    element.data.y = position.y * this.scheme.density;

    element.data.id = element.id;
  }

  public alignGridWidth(pageSize) {
    const width = Math.round(pageSize / this.scheme.density);
    const diff = width - this.scheme.width;

    if (diff) {
      this.scheme.width = width;
      this.scheme.elements.map(element => {
        element.position.dx = element.position.dx + diff;

        this.setDimensions(element);

        this.events.changed.next(element);
      });

      this.change(this.scheme);
    }
  }
}
