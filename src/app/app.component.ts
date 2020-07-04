import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from './core/services/breadcrumb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  opened: boolean = true;

  breadcrumbItems: MenuItem[];

  constructor(private breadcrumbService: BreadcrumbService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.breadcrumbService.breadcrumbItems$.subscribe((breadcrumbItems) => {
      this.breadcrumbItems = breadcrumbItems;
      this.cdr.detectChanges();
    });
  }

  onToggleSidebar() {
    this.opened = !this.opened;
  }
}
