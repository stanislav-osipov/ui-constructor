import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
      position: { x: 0, dx: 3, y: 6, dy: 8 },
      type: 'Button',
      data: {
        text: 'Click me 2!'
      }
    },
    {
      position: { x: 0, dx: 3, y: 0, dy: 3 },
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
      position: { x: 6, dx: 10, y: 2, dy: 14 },
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
