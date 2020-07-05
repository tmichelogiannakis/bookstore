import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng/primeng.module';
import { ArrayPipe } from './pipes/array.pipe';
import { ImageuploadComponent } from './components/form/imageupload/imageupload.component';

const components = [ImageuploadComponent];

@NgModule({
  declarations: [...components, ArrayPipe],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, PrimengModule],
  exports: [CommonModule, ReactiveFormsModule, RouterModule, PrimengModule, ...components, ArrayPipe]
})
export class SharedModule {}
