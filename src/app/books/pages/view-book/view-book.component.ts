import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';
import { Book } from '../../../core/models/book.model';
import { BookGenre } from '../../../core/models/book-genre.model';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  book: Book;
  similarBooks$: Observable<Book[]>;
  bookGenreMap: { [key: string]: string };

  constructor(private route: ActivatedRoute, private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.similarBooks$ = this.route.data.pipe(map((data) => data.similarBooks));
    this.route
      .parent!.data.pipe(
        map((data) => data.bookGenres),
        takeUntil(this.unsubscribe)
      )
      .subscribe((bookGenres: BookGenre[]) => {
        this.bookGenreMap = bookGenres.reduce((acc, bg) => ({ ...acc, [bg.id]: bg.label }), {});
      });

    this.route.data
      .pipe(
        map((data) => data.book),
        takeUntil(this.unsubscribe)
      )
      .subscribe((book: Book) => {
        // published is either numeric (year) or string (date)
        // if not numeric take the Year part
        let published = book.published;
        if (isNaN(Number(published))) {
          published = new Date(published).getFullYear();
        }

        this.book = { ...book, published };
        this.breadcrumbService.pushItem({
          id: 'books-view',
          label: book.title,
          routerLink: ['/books', book.isbn, 'view']
        });
      });
  }

  ngOnDestroy(): void {
    this.breadcrumbService.removeItem('books-view');
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
