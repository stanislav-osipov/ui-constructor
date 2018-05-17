import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  ViewChild,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as Jodit from 'jodit';


@Component({
  selector: 'ucs-editor-dialog',
  templateUrl: './editor-dialog.component.html',
  styleUrls: ['./editor-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') container: ElementRef;

  private editor;

  constructor(
    private dialogRef: MatDialogRef<EditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.editor = new Jodit(this.container.nativeElement);

    this.editor.value = this.data.html;

    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(this.editor.value);
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
