import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BreadcrumbService } from './core/services/breadcrumb.service';
import { AppStateService } from './core/services/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sidebarOpened: boolean = true;

  loading$: Observable<boolean>;

  breadcrumbItems$: Observable<MenuItem[]>;

  constructor(private breadcrumbService: BreadcrumbService, private appStateService: AppStateService) {}

  ngOnInit() {
    this.breadcrumbItems$ = this.breadcrumbService.breadcrumbItems$.pipe(delay(0));
    this.loading$ = this.appStateService.loading$;
  }

  onToggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }
}
