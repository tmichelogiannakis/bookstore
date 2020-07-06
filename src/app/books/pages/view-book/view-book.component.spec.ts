import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewBookComponent } from './view-book.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Book } from '../../../core/models/book.model';
import { BookGenre } from '../../../core/models/book-genre.model';
import { ArrayPipe } from '../../../shared/pipes/array.pipe';

const book: Book = {
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
};

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ book }),
            snapshot: { data: { book } },
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
