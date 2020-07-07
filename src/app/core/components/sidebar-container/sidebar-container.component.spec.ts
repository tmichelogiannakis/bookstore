import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { SidebarContainerComponent } from './sidebar-container.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `<app-sidebar-container [opened]="sidebarOpened"></app-sidebar-container>`
})
class HostComponent {
  sidebarOpened: boolean = true;

  setSidebarOpened(value: boolean) {
    this.sidebarOpened = value;
  }
}

describe('SidebarContainerComponent', () => {
  let component: SidebarContainerComponent;
  let fixture: ComponentFixture<SidebarContainerComponent>;
  let hostComponent: HostComponent;
  let hostFixture: ComponentFixture<HostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarContainerComponent, HostComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    hostFixture = TestBed.createComponent(HostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('supports the sidebarOpened attribute as binding', () => {
    const nestedComponent: SidebarContainerComponent = hostFixture.debugElement.query(By.directive(SidebarContainerComponent))
      .componentInstance;

    // set sidebaOpened to true on host component and check on if true on test component
    hostComponent.setSidebarOpened(true);
    hostFixture.detectChanges();
    expect(nestedComponent.opened).toBe(true);

    // set sidebaOpened to false on host component
    hostComponent.setSidebarOpened(false);
    hostFixture.detectChanges();
    expect(nestedComponent.opened).toBe(false);
  });
});
