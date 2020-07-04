import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookResolver } from './book.resolver';

describe('BookResolver', () => {
  let service: BookResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BookResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
