import { AfterViewInit, Directive, ElementRef, inject, input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: 'img[lazy]',
  standalone: true,
})
export class LazyImageDirective implements AfterViewInit {
  private readonly el = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  readonly lazy = input.required<string>();

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const imgElement = this.el.nativeElement as HTMLImageElement;
    const imgSrc = this.lazy();
    imgElement.src = imgSrc || 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw';
    const obs = new IntersectionObserver((entries, observer) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        imgElement.src = imgSrc;
        observer.disconnect();
      }
    }, { threshold: 0 })
    obs.observe(imgElement);
  }
}
