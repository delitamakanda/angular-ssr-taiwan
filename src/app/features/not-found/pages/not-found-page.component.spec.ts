import { RESPONSE_INIT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it, vi } from 'vitest';
import { SeoService } from '@app/core/seo/seo.service';
import { NotFoundPageComponent } from './not-found-page.component';

function setup(responseInit: ResponseInit | null) {
  const update = vi.fn();
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      { provide: SeoService, useValue: { update } },
      ...(responseInit ? [{ provide: RESPONSE_INIT, useValue: responseInit }] : []),
    ],
  });
  TestBed.createComponent(NotFoundPageComponent);
  return { update };
}

describe('NotFoundPageComponent', () => {
  it('flags the page as noindex', () => {
    const { update } = setup(null);
    expect(update).toHaveBeenCalledWith(expect.objectContaining({ noindex: true }));
  });

  it('sets a 404 status when a server response is available', () => {
    const init: ResponseInit = { status: 200 };
    setup(init);
    expect(init.status).toBe(404);
  });
});
