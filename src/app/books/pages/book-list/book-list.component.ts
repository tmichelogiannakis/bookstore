import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataView } from 'primeng/dataview';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { Book } from '../../../core/models/book.model';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [ConfirmationService]
})
export class BookListComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  @ViewChild('dv') dv: DataView;
  books: Book[];

  constructor(private route: ActivatedRoute, private confirmationService: ConfirmationService, private bookService: BooksService) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        takeUntil(this.unsubscribe),
        map((data) => data.books)
      )
      .subscribe((books) => (this.books = books));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  booksTrackByFn(index: number, item: Book) {
    return item.isbn;
  }

  // InputEvent from input field to filter book in dataview
  filterBooksFn(event: any) {
    this.dv.filter(event.target.value, 'contains');
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
