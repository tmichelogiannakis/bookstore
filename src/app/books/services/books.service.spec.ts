import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BooksService } from './books.service';
import { Book } from '../../core/models/book.model';

const dummyResponse: Book[] = [
  {
    isbn: 'isbn1',
    title: 'title1',
    subtitle: 'subtitle1',
    author: 'author1',
    published: new Date().toISOString(),
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
    published: new Date().toISOString(),
    publisher: 'publisher2',
    pages: 222,
    description: 'description2',
    website: 'http://example2.com/',
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
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(service.endpoints.books);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
