import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

const modules = [ButtonModule, ConfirmDialogModule, DataViewModule, InputTextModule, InputTextareaModule];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class PrimengModule {}
