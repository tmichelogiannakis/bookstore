import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BooksComponent } from './books.component';
import { BooksResolver } from './resolvers/books.resolver';
import { BookListComponent } from './pages/book-list/book-list.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { CanDeactivateBookGuard } from './guards/can-deactivate-book.guard';

const routes: Route[] = [
  {
    path: '',
    component: BooksComponent,
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
        component: AddBookComponent,
        canDeactivate: [CanDeactivateBookGuard],
        runGuardsAndResolvers: 'always'
      }
    ]
  }
];

@NgModule({
  declarations: [BooksComponent, BookListComponent, AddBookComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class BooksModule {}
