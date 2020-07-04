import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {
  book$: Observable<Book>;

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
  }
}
