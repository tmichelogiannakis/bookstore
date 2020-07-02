import { NgModule } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';

const modules = [DataViewModule, InputTextModule];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class PrimengModule {}
