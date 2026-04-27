import { Component, input } from '@angular/core';
import { Article } from '../../models/article.model';
import { StripHtmlPipe } from '../../../../shared/pipes/strip-html.pipe';
import { RouterLink } from '@angular/router';
import { LazyImageDirective } from '../../../../shared/directives/lazy-image.directive';

@Component({
  selector: 'app-article-card',
  imports: [StripHtmlPipe, RouterLink, LazyImageDirective],
  templateUrl: './article-card.html',
  styleUrl: './article-card.scss',
})
export class ArticleCard {
  readonly post = input.required<Article>();
  priority = input<'high' | 'low'>('low');
}
