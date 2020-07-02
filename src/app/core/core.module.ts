import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [BrowserAnimationsModule, HttpClientModule, SharedModule],
  exports: [SharedModule, HeaderComponent]
})
export class CoreModule {}
