import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  standalone: true,
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {}
