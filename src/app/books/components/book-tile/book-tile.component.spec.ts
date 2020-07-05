import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookTileComponent } from './book-tile.component';
import { ArrayPipe } from '../../../shared/pipes/array.pipe';
import { Book } from '../../../core/models/book.model';

const book: Book = {
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
};

describe('BookTileComponent', () => {
  let component: BookTileComponent;
  let fixture: ComponentFixture<BookTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookTileComponent, ArrayPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTileComponent);
    component = fixture.componentInstance;
    component.book = book;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
