import { Component, inject } from '@angular/core';
import { SeoService } from '../../../core/seo/seo.service';
import { SITE_CONFIG } from '../../../core/config/site.config';
import { ContactFormComponent } from '../component/contact-form/contact-form.component';

@Component({
  selector: 'app-contact-page.component',
  imports: [ContactFormComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: `${SITE_CONFIG.site_name} | Contact Us`,
      description:
        'Contact our team and get in touch with us for any inquiries, ideas, or opportunities.',
      canonical_url: `${SITE_CONFIG.site_url}/contact`,
    });
  }
}
