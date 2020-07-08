import { TestBed } from '@angular/core/testing';

import { BreadcrumbService } from './breadcrumb.service';
import { MenuItem } from 'primeng/api';

const homeMenuItem: MenuItem = {
  id: 'home',
  icon: 'pi pi-home',
  routerLink: ['/']
};

const menuItems: MenuItem[] = [
  {
    id: 'menuItem1',
    label: 'menuItem1',
    routerLink: ['/menuItem1']
  },
  {
    id: 'menuItem2',
    label: 'menuItem2',
    routerLink: ['/menuItem2']
  }
];

describe('BreadcrumbService', () => {
  let service: BreadcrumbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreadcrumbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('breadcrumbItems$ should emits the items that are set', () => {
    let index = 0;
    const results = [
      [homeMenuItem],
      [homeMenuItem, menuItems[0]],
      [homeMenuItem, ...menuItems],
      [homeMenuItem, menuItems[1]],
      [homeMenuItem, menuItems[1], menuItems[0]],
      [homeMenuItem, menuItems[0]],
      [homeMenuItem]
    ];
    service.breadcrumbItems$.subscribe((items) => {
      expect(items).toEqual(results[index]);
      index++;
    });
    service.pushItem(menuItems[0]);
    service.pushItem(menuItems[1]);
    service.removeItem(menuItems[0].id as string);
    service.pushItem(menuItems[0]);
    service.removeItem(menuItems[1].id as string);
    service.removeItem(menuItems[0].id as string);
  });
});
