import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../../../core/models/book.model';
import { DataView } from 'primeng/dataview';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  @ViewChild('dv') dv: DataView;

  books$: Observable<Book[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.books$ = this.route.data.pipe(map((data) => data.books));
  }

  booksTrackByFn(index: number, item: Book) {
    return item.isbn;
  }

  // InputEvent from input field to filter book in dataview
  filterBooksFn(event: any) {
    this.dv.filter(event.target.value, 'contains');
  }
}
