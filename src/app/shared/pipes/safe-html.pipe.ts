import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  private readonly domSanitizer = inject(DomSanitizer);

  transform(value: string): any {
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }
}
