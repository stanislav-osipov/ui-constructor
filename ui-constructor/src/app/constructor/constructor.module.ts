import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ConstructorRoutingModule } from './constructor-routing.module';
import { ConstructorComponent } from './constructor/constructor.component';
import { PageModule } from '../page/page.module';

@NgModule({
  imports: [
    SharedModule,
    ConstructorRoutingModule,
    PageModule
  ],
  declarations: [ConstructorComponent]
})
export class ConstructorModule { }
