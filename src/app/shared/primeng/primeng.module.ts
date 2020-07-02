import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';

const modules = [ButtonModule, DataViewModule, InputTextModule];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class PrimengModule {}
