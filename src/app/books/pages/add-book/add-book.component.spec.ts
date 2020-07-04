import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AddBookComponent } from './add-book.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { BookGenre } from 'src/app/core/models/book-genre.model';
import { ArrayPipe } from 'src/app/shared/pipes/array.pipe';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

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

describe('AddBookComponent', () => {
  let component: AddBookComponent;
  let fixture: ComponentFixture<AddBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, ChipsModule, MultiSelectModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of(null),
            snapshot: { data: null },
            params: of(null),
            parent: { data: of({ bookGenres }), snapshot: { data: { bookGenres } }, params: of(null) }
          } as any
        }
      ],
      declarations: [AddBookComponent, ArrayPipe],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
