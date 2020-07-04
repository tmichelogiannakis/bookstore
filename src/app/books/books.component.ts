import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../core/services/breadcrumb.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.pushItem({
      id: 'books',
      label: 'Books',
      routerLink: ['/books']
    });
  }

  ngOnDestroy(): void {
    this.breadcrumbService.removeItem('books');
  }
}
