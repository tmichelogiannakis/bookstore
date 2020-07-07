import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<app-header [sidebarOpened]="sidebarOpened" (toggleSidebar)="onToggleSidebar()"></app-header>`
})
class HostComponent {
  sidebarOpened: boolean = true;

  setSidebarOpened(value: boolean) {
    this.sidebarOpened = value;
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let hostComponent: HostComponent;
  let hostFixture: ComponentFixture<HostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [HeaderComponent, HostComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    hostFixture = TestBed.createComponent(HostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit to toggle sidebar', () => {
    spyOn(component.toggleSidebar, 'emit');
    const button = fixture.debugElement.query(By.css('.menu-button')).nativeElement;
    button.click();
    expect(component.toggleSidebar.emit).toHaveBeenCalledWith();
  });

  it('supports the sidebarOpened attribute as binding', () => {
    const nestedComponent: HeaderComponent = hostFixture.debugElement.query(By.directive(HeaderComponent)).componentInstance;

    // set sidebaOpened to true on host component and check on if true on test component
    hostComponent.setSidebarOpened(true);
    hostFixture.detectChanges();
    expect(nestedComponent.sidebarOpened).toBe(true);

    // set sidebaOpened to false on host component and check on if false on test component
    hostComponent.setSidebarOpened(false);
    hostFixture.detectChanges();
    expect(nestedComponent.sidebarOpened).toBe(false);
  });
});
