import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PrimeTemplate } from 'primeng/api';
import { BookTileComponent } from './book-tile.component';
import { ArrayPipe } from '../../../shared/pipes/array.pipe';
import { Book } from '../../../core/models/book.model';

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

@Component({
  template: `<app-book-tile [book]="book">
    <ng-template pTemplate="actions">
      data
    </ng-template>
  </app-book-tile>`
})
class HostComponent {
  book: Book;

  setBook(value: Book) {
    this.book = value;
  }
}

describe('BookTileComponent', () => {
  let component: BookTileComponent;
  let fixture: ComponentFixture<BookTileComponent>;
  let hostComponent: HostComponent;
  let hostFixture: ComponentFixture<HostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookTileComponent, ArrayPipe, HostComponent, PrimeTemplate]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    hostFixture = TestBed.createComponent(HostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('supports the book attribute as binding', () => {
    const nestedComponent: BookTileComponent = hostFixture.debugElement.query(By.directive(BookTileComponent)).componentInstance;

    // set book on host component and check on if same on test component
    hostComponent.setBook(book);
    hostFixture.detectChanges();
    expect(nestedComponent.book).toEqual(book);
  });

  it('should have actions section', () => {
    const nestedComponent: BookTileComponent = hostFixture.debugElement.children[0].componentInstance;
    expect(nestedComponent.actionsTemplate).toBeTruthy();
  });
});
