import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewBookComponent } from './view-book.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Book } from '../../../core/models/book.model';
import { BookGenre } from '../../../core/models/book-genre.model';
import { ArrayPipe } from '../../../shared/pipes/array.pipe';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';

const books: Book[] = [
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
    categories: ['c1']
  },
  {
    isbn: 'isbn2',
    title: 'title2',
    subtitle: 'subtitle2',
    author: ['author2', 'author3'],
    published: 2002,
    publisher: 'publisher2',
    pages: 222,
    description: 'description2',
    website: 'http://example2.com/',
    categories: ['c1', 'c2']
  },
  {
    isbn: 'isbn3',
    title: 'title3',
    subtitle: 'subtitle3',
    author: ['author3', 'author4'],
    published: 2003,
    publisher: 'publisher2',
    pages: 333,
    description: 'description3',
    website: 'http://example3.com/',
    categories: ['c1', 'c2', 'c3']
  }
];

const book = books[0];

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

describe('ViewBookComponent', () => {
  let component: ViewBookComponent;
  let fixture: ComponentFixture<ViewBookComponent>;
  let breadcrumbService: BreadcrumbService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        BreadcrumbService,
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ book, similarBooks: books }),
            snapshot: { data: { book, similarBooks: books } },
            params: of(null),
            parent: { data: of({ bookGenres }), snapshot: { data: { bookGenres } }, params: of(null) }
          } as any
        }
      ],
      declarations: [ViewBookComponent, ArrayPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    breadcrumbService = TestBed.inject(BreadcrumbService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('categoryTrackBy should return category', () => {
    expect(component.categoryTrackBy(0, 'category')).toBe('category');
  });

  it('should track by categoryTrackBy', () => {
    expect(component.booksTrackBy(0, book)).toBe(book.isbn);
  });

  it('should clear item from breadcrumbService on ngOnDestroy()', () => {
    let index = 0;
    const results = [
      [
        {
          id: 'home',
          icon: 'pi pi-home',
          routerLink: ['/']
        },
        {
          id: 'books-view',
          label: book.title,
          routerLink: ['/books', book.isbn, 'view']
        }
      ],
      [
        {
          id: 'home',
          icon: 'pi pi-home',
          routerLink: ['/']
        }
      ]
    ];

    breadcrumbService.breadcrumbItems$.subscribe((items) => {
      expect(items).toEqual(results[index]);
      index++;
    });

    fixture.destroy();
  });
});
