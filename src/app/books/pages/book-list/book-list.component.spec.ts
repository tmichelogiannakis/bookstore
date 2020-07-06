import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { BookListComponent } from './book-list.component';
import { Book } from '../../../core/models/book.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookGenre } from '../../../core/models/book-genre.model';

const books: Book[] = [
  {
    isbn: 'isbn1',
    title: 'title1',
    subtitle: 'subtitle1',
    author: 'author1',
    published: 1999,
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
    published: 2004,
    publisher: 'publisher2',
    pages: 222,
    description: 'description2',
    website: 'http://example2.com/',
    categories: []
  }
];

const bookGenres: BookGenre[] = [
  {
    label: 'Classic',
    id: 'c1'
  },
  {
    label: 'Crime/detective',
    id: 'c2'
  }
];

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ books }),
            snapshot: { data: { books } },
            params: of(null),
            parent: { data: of({ bookGenres }), snapshot: { data: { bookGenres } }, params: of(null) }
          } as any
        }
      ],
      declarations: [BookListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get books from ActivatedRoute', () => {
    expect(component.books).toEqual(books);
  });
});
