import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng/primeng.module';
import { ArrayPipe } from './pipes/array.pipe';
import { ImageuploadComponent } from './components/form/imageupload/imageupload.component';
import { DataviewComponent } from './components/dataview/dataview.component';

const components = [ImageuploadComponent, DataviewComponent];

const pipes = [ArrayPipe];

@NgModule({
  declarations: [...components, ...pipes],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, PrimengModule],
  exports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, PrimengModule, ...components, ...pipes]
})
export class SharedModule {}
