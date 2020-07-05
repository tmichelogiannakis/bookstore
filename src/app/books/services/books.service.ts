import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../core/models/book.model';
import { BookGenre } from '../../core/models/book-genre.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  readonly endpoints = {
    books: '/books',
    booksGenres: '/book-genres'
  };

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.endpoints.books);
  }

  createBook(payload: Book): Observable<Book> {
    return this.http.post<Book>(this.endpoints.books, payload);
  }

  updateBook(isbn: string, payload: Book): Observable<Book> {
    return this.http.put<Book>(`${this.endpoints.books}/${isbn}`, payload);
  }

  deleteBook(isbn: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoints.books}/${isbn}`);
  }

  getBook(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.endpoints.books}/${isbn}`);
  }

  getAllBookGenres(): Observable<BookGenre[]> {
    return this.http.get<BookGenre[]>(this.endpoints.booksGenres);
  }
}
