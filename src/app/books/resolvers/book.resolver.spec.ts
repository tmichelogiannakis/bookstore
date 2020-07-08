import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { Book } from '../../core/models/book.model';
import { BooksService } from '../services/books.service';
import { BookResolver } from './book.resolver';

const formattedBook: Book = {
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
};

describe('BookResolver', () => {
  let resolver: BookResolver;
  let route: ActivatedRoute;
  let httpMock: HttpTestingController;
  let mockSnapshot: RouterStateSnapshot;
  let booksService: BooksService;
  const isbn = 'isbn';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          BooksService,
          provide: ActivatedRoute,
          useValue: {
            data: of(null),
            snapshot: { data: null, params: { isbn } },
            params: of({ isbn })
          } as any
        }
      ]
    });
    resolver = TestBed.inject(BookResolver);
    route = TestBed.get(ActivatedRoute);
    booksService = TestBed.get(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should be able to resolve a book', () => {
    resolver.resolve(route.snapshot, mockSnapshot).subscribe((data) => {
      expect(data).toEqual(formattedBook);
    });

    const req = httpMock.expectOne(`${booksService.endpoints.books}/${isbn}`);
    expect(req.request.method).toBe('GET');
    req.flush(formattedBook);
  });
});
