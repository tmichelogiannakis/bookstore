import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';
import { BooksResolver } from './resolvers/books.resolver';
import { BookListComponent } from './pages/book-list/book-list.component';

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
      }
    ]
  }
];

@NgModule({
  declarations: [BooksComponent, BookListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class BooksModule {}
