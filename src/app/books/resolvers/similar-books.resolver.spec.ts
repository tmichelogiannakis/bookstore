import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { Book } from '../../core/models/book.model';
import { BooksService } from '../services/books.service';
import { SimilarBooksResolver } from './similar-books.resolver';

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

describe('SimilarBooksResolver', () => {
  let resolver: SimilarBooksResolver;
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
    resolver = TestBed.inject(SimilarBooksResolver);
    route = TestBed.get(ActivatedRoute);
    booksService = TestBed.get(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should be able to resolve similar books', () => {
    resolver.resolve(route.snapshot, mockSnapshot).subscribe((data) => {
      expect(data).toEqual(formattedBooks);
    });

    const req = httpMock.expectOne(`${booksService.endpoints.books}/${isbn}/similar`);
    expect(req.request.method).toBe('GET');
    req.flush(formattedBooks);
  });
});
