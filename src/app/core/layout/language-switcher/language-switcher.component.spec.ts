import { Component, LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { LanguageSwitcherComponent } from './language-switcher.component';

@Component({ template: '' })
class DummyComponent {}

async function setup(locale = 'fr-FR') {
  TestBed.configureTestingModule({
    providers: [
      { provide: LOCALE_ID, useValue: locale },
      provideRouter([{ path: '**', component: DummyComponent }]),
    ],
  });
  const fixture = TestBed.createComponent(LanguageSwitcherComponent);
  fixture.detectChanges();
  const navigate = async (url: string) => {
    await TestBed.inject(Router).navigateByUrl(url);
    fixture.detectChanges();
  };
  return { el: fixture.nativeElement as HTMLElement, navigate };
}

describe('LanguageSwitcherComponent', () => {
  it('renders the three languages', async () => {
    const { el } = await setup();
    const items = Array.from(el.querySelectorAll('li')).map((li) => li.textContent?.trim());
    expect(items).toEqual(['English', '繁體中文', 'Français']);
  });

  it('marks the active locale with aria-current and does not link it', async () => {
    const { el } = await setup('fr-FR');
    const current = el.querySelector('[aria-current="true"]');
    expect(current?.textContent?.trim()).toBe('Français');
    expect(current?.tagName).not.toBe('A');
    expect(el.querySelectorAll('a').length).toBe(2);
  });

  it('gives the other links href, lang and hreflang', async () => {
    const { el } = await setup('fr-FR');
    const links = Array.from(el.querySelectorAll('a'));
    expect(links.map((a) => a.getAttribute('href'))).toEqual(['/en-US/', '/zh-TW/']);
    expect(links.map((a) => a.getAttribute('lang'))).toEqual(['en', 'zh-TW']);
    expect(links.map((a) => a.getAttribute('hreflang'))).toEqual(['en', 'zh-TW']);
  });

  it('gives links an accessible name that contains their visible text', async () => {
    const { el } = await setup('fr-FR');
    for (const a of Array.from(el.querySelectorAll('a'))) {
      expect(a.getAttribute('aria-label')).toContain(a.textContent?.trim());
    }
  });

  it('keeps path, query string and fragment', async () => {
    const { el, navigate } = await setup('fr-FR');
    await navigate('/destinations?page=2#top');
    const hrefs = Array.from(el.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['/en-US/destinations?page=2#top', '/zh-TW/destinations?page=2#top']);
  });

  it('does not stack locale prefixes on an already prefixed URL', async () => {
    const { el, navigate } = await setup('fr-FR');
    await navigate('/fr-FR/destinations');
    const hrefs = Array.from(el.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['/en-US/destinations', '/zh-TW/destinations']);
  });
});
