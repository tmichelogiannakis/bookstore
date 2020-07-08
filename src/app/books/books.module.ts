import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CanDeactivateGuard } from '../core/guards/can-deactivate.guard';
import { BooksComponent } from './books.component';
import { BookGenresResolver } from './resolvers/book-genres.resolver';
import { BooksResolver } from './resolvers/books.resolver';
import { BookResolver } from './resolvers/book.resolver';
import { SimilarBooksResolver } from './resolvers/similar-books.resolver';
import { BookListComponent } from './pages/book-list/book-list.component';
import { ViewBookComponent } from './pages/view-book/view-book.component';
import { AddEditBookComponent } from './pages/add-edit-book/add-edit-book.component';
import { BookTileComponent } from './components/book-tile/book-tile.component';

const routes: Route[] = [
  {
    path: '',
    component: BooksComponent,
    resolve: {
      bookGenres: BookGenresResolver
    },
    children: [
      {
        path: '',
        component: BookListComponent,
        resolve: {
          books: BooksResolver
        }
      },
      {
        path: 'add',
        component: AddEditBookComponent,
        canDeactivate: [CanDeactivateGuard],
        runGuardsAndResolvers: 'always'
      },
      {
        path: ':isbn',
        component: AddEditBookComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          book: BookResolver
        }
      },
      {
        path: ':isbn/view',
        component: ViewBookComponent,
        resolve: {
          book: BookResolver,
          similarBooks: SimilarBooksResolver
        }
      }
    ]
  }
];

@NgModule({
  declarations: [BooksComponent, BookListComponent, ViewBookComponent, AddEditBookComponent, BookTileComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class BooksModule {}
