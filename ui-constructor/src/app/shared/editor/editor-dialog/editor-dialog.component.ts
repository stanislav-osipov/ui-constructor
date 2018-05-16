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
import { exec, init } from 'pell';

@Component({
  selector: 'ucs-editor-dialog',
  templateUrl: './editor-dialog.component.html',
  styleUrls: ['./editor-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') container: ElementRef;

  private editor;
  private html;

  constructor(
    private dialogRef: MatDialogRef<EditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.editor = init({
      element: this.container.nativeElement,
      actions: [
        'bold',
        'italic',
        'heading1',
        'heading2',
        'olist',
        'ulist',
        'code',
        'line',
        'link',
        'image'
      ],
      onChange: html => (this.html = html)
    });

    this.editor.content.innerHTML = this.data.html;

    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(this.html);
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
