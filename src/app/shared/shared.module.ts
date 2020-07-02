import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, PrimengModule],
  exports: [CommonModule, RouterModule, PrimengModule]
})
export class SharedModule {}
