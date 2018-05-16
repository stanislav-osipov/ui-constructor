import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { EditorDialogComponent } from '../editor-dialog/editor-dialog.component';

@Component({
  selector: 'ucs-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit {
  @Input() html;
  @Output() close = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(EditorDialogComponent, {
      data: { html: this.html }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.html = result;
        this.close.next(result);
      }
    });
  }
}
