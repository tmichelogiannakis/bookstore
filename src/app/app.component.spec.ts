import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule],
      declarations: [AppComponent, HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('onToggleSidebar() should toggle sidebarOpened', () => {
    const sidebarOpened = app.sidebarOpened;
    app.onToggleSidebar();
    fixture.detectChanges();
    expect(app.sidebarOpened).toBe(!sidebarOpened);
  });

  it('onToggleSidebar() to be triggered from header emit', () => {
    spyOn(app, 'onToggleSidebar');
    const headerComponent: HeaderComponent = fixture.debugElement.query(By.directive(HeaderComponent)).componentInstance;
    headerComponent.toggleSidebar.emit();
    expect(app.onToggleSidebar).toHaveBeenCalled();
  });
});
