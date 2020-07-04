import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BookGenre } from '../../core/models/book-genre.model';
import { BooksService } from '../services/books.service';

@Injectable({
  providedIn: 'root'
})
export class BookGenresResolver implements Resolve<BookGenre[]> {
  constructor(private bookService: BooksService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BookGenre[]> {
    return this.bookService.getAllBookGenres();
  }
}
