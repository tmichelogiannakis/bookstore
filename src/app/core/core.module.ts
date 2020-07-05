import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SidebarModule } from 'ng-sidebar';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarContainerComponent } from './components/sidebar-container/sidebar-container.component';
import { HttpRequestInterceptor } from './services/http-request.interceptor';
import { HttpMockRequestInterceptor } from './services/http-mock-request.interceptor';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [HeaderComponent, SidebarContainerComponent, SidebarContainerComponent, BreadcrumbComponent],
  imports: [BrowserAnimationsModule, SidebarModule.forRoot(), HttpClientModule, SharedModule],
  exports: [SharedModule, HeaderComponent, SidebarContainerComponent, BreadcrumbComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpMockRequestInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
