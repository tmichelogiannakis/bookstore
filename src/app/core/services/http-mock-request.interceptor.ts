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

    const fileToBase64 = (file: File): Promise<string> => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<string>((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });
    };

    return of(null).pipe(
      mergeMap(() => {
        if (url.endsWith('/book-genres') && method === 'GET') {
          return of(new HttpResponse({ status: 200, body: (bookGenresJSON as any).default }));
        }

        if (url.endsWith('/similar') && method === 'GET') {
          // Shuffle array
          const shuffled = this.books.sort(() => 0.5 - Math.random());
          return of(new HttpResponse({ status: 200, body: shuffled.slice(0, 3) }));
        }

        if (url.endsWith('/books') && method === 'GET') {
          return of(new HttpResponse({ status: 200, body: this.books }));
        }

        if (url.endsWith('/books') && method === 'POST') {
          if (body.image && body.image instanceof Blob) {
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
          return of(new HttpResponse({ status: 200, body: { ...body, image: undefined } })).pipe(
            tap((data) => {
              this.storeBook(data.body);
            })
          );
        }

        if (url.match(/\/books\/\d+$/) && method === 'PUT') {
          const urlParts = url.split('/');
          const isbn = urlParts[urlParts.length - 1];
          if (body.image && body.image instanceof Blob) {
            return from(fileToBase64(body.image)).pipe(
              mergeMap((base64String) => {
                return of(new HttpResponse({ status: 200, body: { ...body, image: base64String } })).pipe(
                  tap((data) => {
                    this.updateBook(isbn, data.body);
                  })
                );
              })
            );
          }
          return of(new HttpResponse({ status: 200, body: { ...body, image: undefined } })).pipe(
            tap((data) => {
              this.updateBook(isbn, data.body);
            })
          );
        }

        if (url.match(/\/books\/\d+$/) && method === 'DELETE') {
          const urlParts = url.split('/');
          const isbn = urlParts[urlParts.length - 1];
          return of(new HttpResponse({ status: 200, body: {} })).pipe(
            tap(() => {
              this.deleteBook(isbn);
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

  private updateBook(isbn: string, book: Book) {
    this.books = this.books.map((b: Book) => {
      if (b.isbn === isbn) {
        return book;
      }
      return b;
    });
    storeBooks(this.books);
  }

  private deleteBook(isbn: string) {
    this.books = this.books.filter((b: Book) => b.isbn !== isbn);
    storeBooks(this.books);
  }
}
