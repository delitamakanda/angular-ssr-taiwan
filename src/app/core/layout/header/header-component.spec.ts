import { Component, LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { HeaderComponent } from './header-component';

@Component({ template: '' })
class DummyComponent {}

function setup() {
  TestBed.configureTestingModule({
    providers: [
      { provide: LOCALE_ID, useValue: 'fr-FR' },
      provideRouter([
        { path: 'home', component: DummyComponent },
        { path: 'blog', component: DummyComponent },
      ]),
    ],
  });
  const fixture = TestBed.createComponent(HeaderComponent);
  fixture.detectChanges();
  const el = fixture.nativeElement as HTMLElement;
  const button = el.querySelector('button') as HTMLButtonElement;
  return { fixture, el, button };
}

describe('HeaderComponent', () => {
  it('embeds the language switcher and does not print the raw locale code', () => {
    const { el } = setup();
    expect(el.querySelector('app-language-switcher')).not.toBeNull();
    expect(el.textContent).not.toContain('fr-FR');
  });

  it('renders a closed burger button wired to the menu panel', () => {
    const { el, button } = setup();
    expect(button.type).toBe('button');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    const panel = el.querySelector('#header-menu') as HTMLElement;
    expect(button.getAttribute('aria-controls')).toBe('header-menu');
    expect(panel.classList.contains('hidden')).toBe(true);
  });

  it('opens and closes the menu on click', () => {
    const { fixture, el, button } = setup();
    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect((el.querySelector('#header-menu') as HTMLElement).classList.contains('hidden')).toBe(
      false,
    );
    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes on Escape and gives focus back to the button', () => {
    const { fixture, el, button } = setup();
    document.body.appendChild(el);
    button.click();
    fixture.detectChanges();
    el.querySelector('nav a')?.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    );
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(button);
    el.remove();
  });

  it('closes after a navigation', async () => {
    const { fixture, button } = setup();
    button.click();
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/blog');
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('flags the current page link with aria-current="page"', async () => {
    const { fixture, el } = setup();
    await TestBed.inject(Router).navigateByUrl('/blog');
    fixture.detectChanges();
    const current = el.querySelectorAll('nav a[aria-current="page"]');
    expect(current.length).toBe(1);
    expect(current[0].getAttribute('href')).toBe('/blog');
  });
});
