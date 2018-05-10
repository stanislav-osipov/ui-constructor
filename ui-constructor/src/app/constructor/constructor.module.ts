import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ConstructorRoutingModule } from './constructor-routing.module';
import { ConstructorComponent } from './constructor/constructor.component';

@NgModule({
  imports: [
    SharedModule,
    ConstructorRoutingModule
  ],
  declarations: [ConstructorComponent]
})
export class ConstructorModule { }
