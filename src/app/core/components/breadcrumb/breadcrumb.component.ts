import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent {
  @Input()
  breadcrumbItems: MenuItem[] | null;

  constructor() {}

  trackByFn(index: number, item: MenuItem) {
    return item.id;
  }
}
