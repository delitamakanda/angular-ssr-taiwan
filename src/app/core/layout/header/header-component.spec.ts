import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { HeaderComponent } from './header-component';

describe('HeaderComponent', () => {
  it('embeds the language switcher and does not print the raw locale code', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }, provideRouter([])],
    });
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-language-switcher')).not.toBeNull();
    expect(el.textContent).not.toContain('fr-FR');
  });
});
