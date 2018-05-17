import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  Input
} from '@angular/core';

import { DynamicComponent } from '../button/button.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ucs-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent extends DynamicComponent implements OnInit {
  public sanitizedContent: SafeHtml;

  constructor(
    @Inject(CardComponent.DATA_TOKEN) public data,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  ngOnInit() {
    this.sanitizedContent = this.convertToSafe(this.data.content);
  }

  saveContent(value) {
    this.data.content = value;
    this.sanitizedContent = this.convertToSafe(this.data.content);
  }

  private convertToSafe(content) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
