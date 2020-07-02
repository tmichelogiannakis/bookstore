import { NgModule } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';

const modules = [DataViewModule];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class PrimengModule {}
