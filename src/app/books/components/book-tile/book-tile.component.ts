import { Component, Input, ChangeDetectionStrategy, ContentChildren, TemplateRef, QueryList, AfterContentInit } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-book-tile',
  templateUrl: './book-tile.component.html',
  styleUrls: ['./book-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookTileComponent implements AfterContentInit {
  @Input()
  book: Book;

  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

  actionsTemplate: TemplateRef<PrimeTemplate>;

  constructor() {}

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'actions':
          this.actionsTemplate = item.template;
          break;
      }
    });
  }
}
