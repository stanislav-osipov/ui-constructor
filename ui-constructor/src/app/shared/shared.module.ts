import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatExpansionModule,
  MatListModule
} from '@angular/material';
import { ButtonComponent } from './dynamic/button/button.component';
import { CardComponent } from './dynamic/card/card.component';
import { BaseComponent } from './dynamic/base/base.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule
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
    MatListModule
  ],
  declarations: [ButtonComponent, CardComponent, BaseComponent]
})
export class SharedModule {}
