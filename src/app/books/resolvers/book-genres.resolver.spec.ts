import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookGenresResolver } from './book-genres.resolver';

describe('BookGenresResolver', () => {
  let service: BookGenresResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BookGenresResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
