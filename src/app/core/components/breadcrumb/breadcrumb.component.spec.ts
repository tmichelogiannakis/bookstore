import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbComponent } from './breadcrumb.component';
import { MenuItem } from 'primeng/api';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<app-breadcrumb [breadcrumbItems]="breadcrumbItems"></app-breadcrumb>`
})
class HostComponent {
  breadcrumbItems: MenuItem[];

  setBreadcrumbItems(value: MenuItem[]) {
    this.breadcrumbItems = value;
  }
}

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let hostComponent: HostComponent;
  let hostFixture: ComponentFixture<HostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent, HostComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    hostFixture = TestBed.createComponent(HostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('supports the breadcrumbItems attribute as binding', () => {
    const nestedComponent: BreadcrumbComponent = hostFixture.debugElement.query(By.directive(BreadcrumbComponent)).componentInstance;

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

    // set menuItems on host component and check on if same on test component
    hostComponent.setBreadcrumbItems(menuItems);
    hostFixture.detectChanges();
    expect(nestedComponent.breadcrumbItems).toEqual(menuItems);
  });
});
