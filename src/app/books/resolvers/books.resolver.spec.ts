import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BooksResolver } from './books.resolver';

describe('BooksResolver', () => {
  let resolver: BooksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    resolver = TestBed.inject(BooksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
