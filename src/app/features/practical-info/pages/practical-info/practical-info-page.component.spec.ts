import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { Page } from '../../../../core/models/page.model';
import { PracticalInfoPageComponent } from './practical-info-page.component';

const basePage: Page = {
  id: 1,
  slug: 'about-taiwan',
  title: 'About Taiwan',
  excerpt: 'Excerpt',
  content: '<p class="body">Hello</p>',
};

function render(page: Page | null) {
  const fixture = TestBed.createComponent(PracticalInfoPageComponent);
  fixture.componentRef.setInput('page', page);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('PracticalInfoPageComponent', () => {
  it('renders the cover image with the page title as alt', () => {
    const el = render({ ...basePage, cover_image_url: 'https://example.com/cover.jpg' });
    const img = el.querySelector('img')!;
    expect(img.getAttribute('src')).toContain('https://example.com/cover.jpg');
    expect(img.getAttribute('alt')).toBe('About Taiwan');
  });

  it('falls back to a local decorative image without any external placeholder host', () => {
    const el = render(basePage);
    const img = el.querySelector('img')!;
    expect(img.getAttribute('src')).toContain('hero-taiwan.svg');
    expect(img.getAttribute('alt')).toBe('');
    expect(el.innerHTML).not.toContain('https://via.');
  });

  it('renders nothing when page is null', () => {
    expect(render(null).querySelector('article')).toBeNull();
  });

  it('renders title and HTML content', () => {
    const el = render(basePage);
    expect(el.querySelector('h1')?.textContent).toContain('About Taiwan');
    expect(el.querySelector('.body')?.textContent).toBe('Hello');
  });
});
