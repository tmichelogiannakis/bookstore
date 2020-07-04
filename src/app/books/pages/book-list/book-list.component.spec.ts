import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { BookListComponent } from './book-list.component';
import { Book } from '../../../core/models/book.model';

const books: Book[] = [
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

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: { data: of({ books }), snapshot: { data: { books } }, params: of(null) } as any }],
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
    component.books$.subscribe((data) => {
      expect(data).toEqual(books);
    });
  });
});
