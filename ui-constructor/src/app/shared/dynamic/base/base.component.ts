import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { EventsService } from '../../../page/page/events/events.service';

@Component({
  selector: 'ucs-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponent implements AfterViewInit, OnDestroy {
  @Input() data: any;

  @ViewChild('draggable') dragIcon: ElementRef;
  @ViewChild('resizible') resizeIcon: ElementRef;

  private destroy = new Subject<void>();

  constructor(private events: EventsService, private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this.data.draggable) {
      this.dragIcon.nativeElement.addEventListener('mousedown', event => {
        this.events.dragged = this.data.id;
        event.stopPropagation();
      });

      this.resizeIcon.nativeElement.addEventListener('mousedown', event => {
        this.events.resized = this.data.id;
        event.stopPropagation();
      });

      this.events.changed
        .pipe(
          takeUntil(this.destroy),
          filter(element => element.id === this.data.id)
        )
        .subscribe(element => {
          this.data = element.data;
          this.cd.detectChanges();
        });
    }
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
