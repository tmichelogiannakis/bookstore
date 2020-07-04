import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../core/models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  readonly endpoints = {
    books: '/books'
  };

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.endpoints.books);
  }

  createBook(payload: Book): Observable<Book> {
    return this.http.post<Book>(this.endpoints.books, payload);
  }

  getBook(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.endpoints.books}/${isbn}`);
  }
}
