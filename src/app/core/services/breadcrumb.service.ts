import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbItems: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([
    {
      id: 'home',
      icon: 'pi pi-home',
      routerLink: ['/']
    }
  ]);

  breadcrumbItems$: Observable<MenuItem[]> = this.breadcrumbItems.asObservable();

  constructor() {}

  pushItem(item: MenuItem) {
    const items = this.breadcrumbItems.getValue();
    this.breadcrumbItems.next([...items, item]);
  }

  removeItem(itemId: string) {
    const items = this.breadcrumbItems.getValue();
    this.breadcrumbItems.next(items.filter((item) => item.id !== itemId));
  }
}
