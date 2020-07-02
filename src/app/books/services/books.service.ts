import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../core/models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  readonly endpoints = {
    books: './assets/data/books.json'
  };

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.endpoints.books);
  }
}
