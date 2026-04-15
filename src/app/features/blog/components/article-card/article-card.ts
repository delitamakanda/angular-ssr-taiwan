import { Component, input } from '@angular/core';
import { Article } from '../../models/article.model';
import { StripHtmlPipe } from '../../../../shared/pipes/strip-html.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-card',
  imports: [StripHtmlPipe, RouterLink],
  templateUrl: './article-card.html',
  styleUrl: './article-card.scss',
})
export class ArticleCard {
  readonly post = input.required<Article>();
}
