import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { delay, mergeMap, tap } from 'rxjs/operators';
import { Book } from '../models/book.model';
import * as booksJSON from './data/books.json';
import * as bookGenresJSON from './data/book-genres.json';

const retrieveBooks = () => {
  const booksString = localStorage.getItem('books');
  return booksString ? JSON.parse(booksString) : (booksJSON as any).default;
};

const storeBooks = (books: Book[]) => {
  localStorage.setItem('books', JSON.stringify(books));
};

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
  private books: Book[];

  constructor() {
    this.books = retrieveBooks();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null).pipe(
      mergeMap(() => {
        if (url.endsWith('/book-genres') && method === 'GET') {
          return of(new HttpResponse({ status: 200, body: (bookGenresJSON as any).default }));
        }

        if (url.endsWith('/books') && method === 'GET') {
          return of(new HttpResponse({ status: 200, body: this.books }));
        }

        if (url.endsWith('/books') && method === 'POST') {
          const fileToBase64 = (file: File): Promise<string> => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise<string>((resolve) => {
              reader.onloadend = () => {
                resolve(reader.result as string);
              };
            });
          };

          return from(fileToBase64(body.image)).pipe(
            mergeMap((base64String) => {
              return of(new HttpResponse({ status: 200, body: { ...body, image: base64String } })).pipe(
                tap((data) => {
                  this.storeBook(data.body);
                })
              );
            })
          );
        }

        if (url.match(/\/books\/\d+$/) && method === 'GET') {
          const urlParts = url.split('/');
          const isbn = urlParts[urlParts.length - 1];
          const book = this.books.find((book) => book.isbn === isbn);
          return of(new HttpResponse({ status: 200, body: book }));
        }

        return next.handle(request);
      }),
      delay(500)
    );
  }

  private storeBook(book: Book) {
    this.books.push(book);
    storeBooks(this.books);
  }
}
