import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { AppShellComponent } from './app-shell.component';

describe('AppShellComponent', () => {
  it('starts with a skip link targeting the main landmark', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(AppShellComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const firstLink = el.querySelector('a') as HTMLAnchorElement;
    expect(firstLink.getAttribute('href')).toBe('#main-content');
    const main = el.querySelector('main') as HTMLElement;
    expect(main.id).toBe('main-content');
    expect(main.getAttribute('tabindex')).toBe('-1');
  });
});
