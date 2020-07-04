import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BreadcrumbService } from './core/services/breadcrumb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  opened: boolean = true;

  breadcrumbItems$: Observable<MenuItem[]>;

  constructor(private breadcrumbService: BreadcrumbService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.breadcrumbItems$ = this.breadcrumbService.breadcrumbItems$.pipe(delay(0));
  }

  onToggleSidebar() {
    this.opened = !this.opened;
  }
}
