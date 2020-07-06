import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BooksService } from './books.service';
import { Book } from '../../core/models/book.model';

const books: Book[] = [
  {
    isbn: 'isbn1',
    title: 'title1',
    subtitle: 'subtitle1',
    author: 'author1',
    published: '2001-02-01T00:00:00.000Z',
    publisher: 'publisher1',
    pages: 111,
    description: 'description1',
    website: 'http://example.com/',
    categories: []
  },
  {
    isbn: 'isbn2',
    title: 'title2',
    subtitle: 'subtitle2',
    author: 'author2',
    published: '2002-02-01T00:00:00.000Z',
    publisher: 'publisher2',
    pages: 222,
    description: 'description2',
    website: 'http://example2.com/',
    categories: []
  },
  {
    isbn: 'isbn3',
    title: 'title3',
    subtitle: 'subtitle3',
    author: 'author3',
    published: '2003-02-01T00:00:00.000Z',
    publisher: 'publisher2',
    pages: 333,
    description: 'description3',
    website: 'http://example3.com/',
    categories: []
  }
];

const formattedBooks: Book[] = [
  {
    isbn: 'isbn1',
    title: 'title1',
    subtitle: 'subtitle1',
    author: 'author1',
    published: 2001,
    publisher: 'publisher1',
    pages: 111,
    description: 'description1',
    website: 'http://example.com/',
    categories: []
  },
  {
    isbn: 'isbn2',
    title: 'title2',
    subtitle: 'subtitle2',
    author: 'author2',
    published: 2002,
    publisher: 'publisher2',
    pages: 222,
    description: 'description2',
    website: 'http://example2.com/',
    categories: []
  },
  {
    isbn: 'isbn3',
    title: 'title3',
    subtitle: 'subtitle3',
    author: 'author3',
    published: 2003,
    publisher: 'publisher2',
    pages: 333,
    description: 'description3',
    website: 'http://example3.com/',
    categories: []
  }
];

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to get all books', () => {
    service.getAllBooks().subscribe((res) => {
      expect(res).toEqual(formattedBooks);
    });

    const req = httpMock.expectOne(service.endpoints.books);
    expect(req.request.method).toBe('GET');
    req.flush(books);
  });

  it('should be able to create a book', () => {
    service.createBook(formattedBooks[0]).subscribe((res) => {
      expect(res).toEqual(formattedBooks[0]);
    });

    const req = httpMock.expectOne(service.endpoints.books);
    expect(req.request.method).toBe('POST');
    req.flush(formattedBooks[0]);
  });

  it('should be able to update a book', () => {
    const isbn = 'isbn3';
    service.updateBook(isbn, books[2]).subscribe((res) => {
      expect(res).toEqual(formattedBooks[2]);
    });

    const req = httpMock.expectOne(`${service.endpoints.books}/${isbn}`);
    expect(req.request.method).toBe('PUT');
    req.flush(formattedBooks[2]);
  });

  it('should be able to delete a book', () => {
    const isbn = 'isbn3';
    service.deleteBook(isbn).subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(`${service.endpoints.books}/${isbn}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should be able to get a book', () => {
    const isbn = 'isbn2';
    service.getBook(isbn).subscribe((res) => {
      expect(res).toEqual(formattedBooks[1]);
    });

    const req = httpMock.expectOne(`${service.endpoints.books}/${isbn}`);
    expect(req.request.method).toBe('GET');
    req.flush(books[1]);
  });

  it('should be able to get similar book', () => {
    const isbn = 'isbn2';
    service.getSimilarBooks(isbn).subscribe((res) => {
      expect(res).toEqual(formattedBooks);
    });

    const req = httpMock.expectOne(`${service.endpoints.books}/${isbn}/similar`);
    expect(req.request.method).toBe('GET');
    req.flush(books);
  });

  it('should be able to get book categories', () => {
    const bookGenres = [
      {
        label: 'label1',
        id: 'c1'
      },
      {
        label: 'label2',
        id: 'c2'
      }
    ];
    service.getAllBookGenres().subscribe((res) => {
      expect(res).toEqual(bookGenres);
    });

    const req = httpMock.expectOne(`${service.endpoints.booksGenres}`);
    expect(req.request.method).toBe('GET');
    req.flush(bookGenres);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
