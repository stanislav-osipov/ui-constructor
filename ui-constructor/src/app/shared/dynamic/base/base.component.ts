import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ucs-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponent implements OnInit {
  @Input() height: string;
  @Input() width: string;
  @Input() x: string;
  @Input() y: string;

  constructor() { }

  ngOnInit() {
  }

}
