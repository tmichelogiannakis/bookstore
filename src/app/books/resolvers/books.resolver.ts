import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../../core/models/book.model';
import { BooksService } from '../services/books.service';

@Injectable({
  providedIn: 'root'
})
export class BooksResolver implements Resolve<Book[]> {
  constructor(private bookService: BooksService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[]> {
    return this.bookService.getAllBooks();
  }
}
