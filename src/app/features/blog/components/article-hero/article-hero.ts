import { Component, input } from '@angular/core';

@Component({
  selector: 'app-article-hero',
  imports: [],
  standalone: true,
  template: ` <div class="article-hero">
    @if (image()) {
      <img [src]="image()" alt="Hero Image" />
    }
    @if (title()) {
      <h1 class="text-3xl font-bold">{{ title() }}</h1>
    }
    @if (subtitle()) {
      <p>{{ subtitle() }}</p>
    }
  </div>`,
  styleUrl: './article-hero.scss',
})
export class ArticleHero {
  readonly image = input<string | null>('');
  readonly title = input<string | null>('');
  readonly subtitle = input<string | null>('');
}
