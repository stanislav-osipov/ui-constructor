import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { MatDialog } from '@angular/material';

import { ColorPickerDialogComponent } from '../color-picker-dialog/color-picker-dialog.component';

@Component({
  selector: 'ucs-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerComponent implements OnInit {
  @Input() selected;
  @Output() color = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(ColorPickerDialogComponent, {
      data: { color: this.selected }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selected = result;
        this.color.next(result);
      }
    });
  }
}
