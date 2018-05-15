import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const scheme = {
  elements: [
    {
      id: 0,
      position: { x: 5, dx: 2, y: 0, dy: 2 },
      type: 'Button',
      data: {
        text: 'Click me!'
      }
    },
    {
      id: 1,
      position: { x: 0, dx: 3, y: 6, dy: 2 },
      type: 'Button',
      data: {
        text: 'Click me 2!'
      }
    },
    {
      id: 2,
      position: { x: 0, dx: 3, y: 0, dy: 3 },
      type: 'Button',
      data: {
        text: 'Click me 3!'
      }
    },
    {
      id: 3,
      position: { x: 1, dx: 3, y: 1, dy: 10 },
      type: 'Card',
      data: {
        title: 'Title 1',
        subtitle: 'Subtitle 1',
        content: 'content content content content content content',
        button: 'Ok'
      }
    },
    {
      id: 4,
      position: { x: 6, dx: 4, y: 2, dy: 8 },
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
  density: 20
};

@Injectable({
  providedIn: 'root'
})
export class SchemeService {
  public data = new BehaviorSubject(scheme);

  constructor() {}

  public change(value) {
    this.data.next(value);
  }
}
