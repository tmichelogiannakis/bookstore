import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimilarBooksResolver } from './similar-books.resolver';

describe('SimilarBooksResolver', () => {
  let service: SimilarBooksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SimilarBooksResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
