import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../core/models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) {}
  
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`/assets/data/books.json`);
  }
}
