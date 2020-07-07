import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.http.get<Book[]>(this.endpoints.books).pipe(map((books) => books.map(this.formatBook)));
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
    return this.http.get<Book>(`${this.endpoints.books}/${isbn}`).pipe(map(this.formatBook));
  }

  getSimilarBooks(isbn: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.endpoints.books}/${isbn}/similar`).pipe(map((books) => books.map(this.formatBook)));
  }

  getAllBookGenres(): Observable<BookGenre[]> {
    return this.http.get<BookGenre[]>(this.endpoints.booksGenres);
  }

  // published is either numeric (year) or string (date)
  // if not numeric take the Year part
  private formatBook(book: Book): Book {
    let published = book.published;
    if (isNaN(Number(published))) {
      published = new Date(published).getFullYear();
    }
    return { ...book, published };
  }
}
