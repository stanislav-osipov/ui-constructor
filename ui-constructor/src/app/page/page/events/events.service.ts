import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor() {}

  public dragged = null;
  public resized = null;
  public changed = new Subject<any>();
}
