import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { BookListComponent } from './book-list.component';
import { Book } from '../../../core/models/book.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookGenre } from '../../../core/models/book-genre.model';
import { By } from '@angular/platform-browser';
import { ConfirmDialog } from 'primeng/confirmDialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelect } from 'primeng/multiselect';
import { Dropdown } from 'primeng/dropdown';
import { Slider } from 'primeng/slider';

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

const bookGenres: BookGenre[] = [
  {
    label: 'c1',
    id: 'c1'
  },
  {
    label: 'c2',
    id: 'c2'
  },
  {
    label: 'c3',
    id: 'c3'
  }
];

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule],
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
      declarations: [BookListComponent, ConfirmDialog, MultiSelect, Dropdown, Slider],
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

  it('should set Books, Published Bounds, Author SelectItems and Bookgenres on ngOnInit()', () => {
    component.genreSelectItems$.subscribe((data) => {
      expect(data).toEqual([
        {
          label: 'c1',
          value: 'c1'
        },
        {
          label: 'c2',
          value: 'c2'
        },
        {
          label: 'c3',
          value: 'c3'
        }
      ]);
    });

    expect(component.books).toEqual(books);
    expect(component.publishedBound).toEqual([2001, 2003]);
    expect(component.authorSelectItems).toEqual([
      { label: 'Author', value: '' },
      { label: 'author1', value: 'author1' },
      { label: 'author2', value: 'author2' },
      { label: 'author3', value: 'author3' },
      { label: 'author4', value: 'author4' }
    ]);
  });

  it('should trigger onFilter()', () => {
    spyOn(component, 'filter');
    const categoriesMultiSelect: MultiSelect = fixture.debugElement.query(By.css('#categories')).componentInstance;
    categoriesMultiSelect.onChange.emit(['c1']);
    const authorsSelect: Dropdown = fixture.debugElement.query(By.css('#authors')).componentInstance;
    authorsSelect.onChange.emit('a1');
    const slider: Slider = fixture.debugElement.query(By.directive(Slider)).componentInstance;
    slider.onChange.emit([1990, 2010]);
    expect(component.filter).toHaveBeenCalledTimes(3);
  });

  it('should prompt confirmation delete dialog', () => {
    component.confirmDeletion(books[0]);
    const confirmDialog: ConfirmDialog = fixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;
    expect(confirmDialog.visible).toBeTrue();
  });
});
