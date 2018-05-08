import { NgModule } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';

import { SharedModule } from '../shared/shared.module';

import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page/page.component';
import { ButtonComponent } from '../shared/dynamic/button/button.component';

@NgModule({
  imports: [SharedModule, PageRoutingModule, PortalModule],
  entryComponents: [ButtonComponent],
  exports: [PageComponent],
  declarations: [PageComponent]
})
export class PageModule {}
