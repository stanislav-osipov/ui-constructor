import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatExpansionModule,
  MatListModule,
  MatInputModule,
  MatDialogModule
} from '@angular/material';
import { ColorPickerModule } from 'ngx-color-picker';

import { ButtonComponent } from './dynamic/button/button.component';
import { CardComponent } from './dynamic/card/card.component';
import { BaseComponent } from './dynamic/base/base.component';
import { ColorPickerComponent } from './color-picker/color-picker/color-picker.component';
import { ColorPickerDialogComponent } from './color-picker/color-picker-dialog/color-picker-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatInputModule,
    ColorPickerModule,
    MatDialogModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    ButtonComponent,
    MatListModule,
    MatInputModule,
    ColorPickerModule,
    MatDialogModule
  ],
  declarations: [ButtonComponent, CardComponent, BaseComponent, ColorPickerComponent, ColorPickerDialogComponent],
  entryComponents: [ColorPickerDialogComponent]
})
export class SharedModule {}
