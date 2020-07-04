import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SidebarModule } from 'ng-sidebar';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarContainerComponent } from './components/sidebar-container/sidebar-container.component';
import { HttpMockRequestInterceptorService } from './services/http-mock-request.interceptor';

@NgModule({
  declarations: [HeaderComponent, SidebarContainerComponent, SidebarContainerComponent],
  imports: [BrowserAnimationsModule, SidebarModule.forRoot(), HttpClientModule, SharedModule],
  exports: [SharedModule, HeaderComponent, SidebarContainerComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpMockRequestInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}
