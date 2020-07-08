import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { BookGenre } from 'src/app/core/models/book-genre.model';
import { BooksService } from '../services/books.service';
import { BookGenresResolver } from './book-genres.resolver';

const bookGenres: BookGenre[] = [
  {
    label: 'label1',
    id: 'c1'
  },
  {
    label: 'label2',
    id: 'c2'
  }
];

describe('BookGenresResolver', () => {
  let resolver: BookGenresResolver;
  let route: ActivatedRoute;
  let httpMock: HttpTestingController;
  let mockSnapshot: RouterStateSnapshot;
  let booksService: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          BooksService,
          provide: ActivatedRoute,
          useValue: {
            data: of(null),
            snapshot: { data: null, params: {} },
            params: of({})
          } as any
        }
      ]
    });
    resolver = TestBed.inject(BookGenresResolver);
    route = TestBed.get(ActivatedRoute);
    booksService = TestBed.get(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should be able to resolve book genres', () => {
    resolver.resolve(route.snapshot, mockSnapshot).subscribe((data) => {
      expect(data).toEqual(bookGenres);
    });

    const req = httpMock.expectOne(`${booksService.endpoints.booksGenres}`);
    expect(req.request.method).toBe('GET');
    req.flush(bookGenres);
  });
});
