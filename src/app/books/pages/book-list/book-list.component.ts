import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books$: Observable<Book[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.books$ = this.route.data.pipe(map((data) => data.books));
  }

  booksTrackByFn(index: number, item: Book) {
    return item.isbn;
  }
}
