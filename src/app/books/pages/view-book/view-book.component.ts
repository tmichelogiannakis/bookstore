import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Book } from '../../../core/models/book.model';
import { BookGenre } from '../../../core/models/book-genre.model';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  book$: Observable<Book>;
  bookGenreMap$: Observable<{ [key: string]: string }>;
  bookGenreMap: { [key: string]: string };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.book$ = this.route.data.pipe(
      map((data) => {
        const book: Book = data.book;
        // published is either numeric (year) or string (date)
        // if not numeric take the Year part
        let published = book.published;
        if (isNaN(Number(published))) {
          published = new Date(published).getFullYear();
        }
        return { ...book, published };
      })
    );

    this.route.parent?.data.subscribe(console.log);

    this.bookGenreMap$ = (this.route.parent as ActivatedRoute).data.pipe(
      map((data) => data.bookGenres),
      map((bookGenres: BookGenre[]) => bookGenres.reduce((acc, bg) => ({ ...acc, [bg.id]: bg.label }), {}))
    );

    this.route
      .parent!.data.pipe(
        map((data) => data.bookGenres),
        takeUntil(this.unsubscribe)
      )
      .subscribe((bookGenres: BookGenre[]) => {
        this.bookGenreMap = bookGenres.reduce((acc, bg) => ({ ...acc, [bg.id]: bg.label }), {});
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
