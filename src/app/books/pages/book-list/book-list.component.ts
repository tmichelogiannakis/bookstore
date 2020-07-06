import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Book } from '../../../core/models/book.model';
import { BooksService } from '../../services/books.service';
import { BookGenre } from '../../../core/models/book-genre.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [ConfirmationService]
})
export class BookListComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  books: Book[];
  genreSelectItems$: Observable<SelectItem[]>;
  publishedBound: number[];
  authors: string[];

  globalFilter: {
    fields: string[];
    value: string;
  } = {
    fields: ['title'],
    value: ''
  };

  filters: {
    [field: string]: {
      value: any;
      matchMode?: string;
    };
  } = {
    categories: {
      value: null,
      matchMode: 'in'
    },
    published: {
      value: [],
      matchMode: '<>'
    },
    author: {
      value: null,
      matchMode: 'in'
    }
  };

  constructor(private route: ActivatedRoute, private confirmationService: ConfirmationService, private bookService: BooksService) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        takeUntil(this.unsubscribe),
        map((data) => data.books)
      )
      .subscribe((books: Book[]) => {
        this.books = books;
        this.calculateFilters(books);
      });

    this.genreSelectItems$ = this.route.parent!.data.pipe(
      takeUntil(this.unsubscribe),
      map((data) => data.bookGenres),
      map((bookGenres: BookGenre[]) => bookGenres.map((g) => ({ label: g.label, value: g.id })))
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  filter(event: any): void {
    this.filters = { ...this.filters };
  }

  calculateFilters(books: Book[]): void {
    const publishedYears: number[] = books.map((book) => book.published as number);
    const min = Math.min(...publishedYears);
    const max = Math.max(...publishedYears);
    this.publishedBound = [min, max];
    this.filters['published'].value = [min, max];
    this.authors = books.reduce((acc: string[], book) => {
      const author = book.author;
      if (!Array.isArray(author)) {
        return [...acc, author];
      }
      return [...acc, ...author];
      // return [...acc];
    }, []);
  }

  confirmDeletion(book: Book): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete the book "${book.title}"?`,
      accept: () => {
        this.bookService
          .deleteBook(book.isbn)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(
            (_) => {
              this.books = this.books.filter((books) => books.isbn !== book.isbn);
            },
            (err) => {
              // todo handle error
            }
          );
      },
      reject: () => {}
    });
  }
}
