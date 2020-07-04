import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng/primeng.module';
import { ArrayPipe } from './pipes/array.pipe';

@NgModule({
  declarations: [ArrayPipe],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, PrimengModule],
  exports: [CommonModule, ReactiveFormsModule, RouterModule, PrimengModule, ArrayPipe]
})
export class SharedModule {}
